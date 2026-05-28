// backend.gs
// Configuración inicial
const SECRET_SALT = 'un_salt_secreto_muy_largo_y_aleatorio'; 

function hashToken(token) {
  const signature = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, token + SECRET_SALT, Utilities.Charset.UTF_8);
  return signature.map(function(e) {
    var v = (e < 0 ? e + 256 : e).toString(16);
    return v.length == 1 ? "0" + v : v;
  }).join("");
}

function doPost(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const postData = JSON.parse(e.postData.contents);
    const { alias, token, score, language, duration, timestamp, signature } = postData;

    // 1. Validaciones
    if (!alias || !token || score === undefined || !language || !duration || !timestamp || !signature) {
      return response(400, "Faltan campos obligatorios", headers);
    }

    if (typeof score !== 'number' || score < 0 || !Number.isInteger(score)) {
      return response(400, "Puntaje inválido", headers);
    }

    if (typeof alias !== 'string' || !/^[a-zA-Z0-9_]{1,20}$/.test(alias)) {
      return response(400, "Alias inválido", headers);
    }

    if (typeof token !== 'string' || !/^sletter_[a-zA-Z0-9]{12}$/.test(token)) {
      return response(400, "Token inválido", headers);
    }

    // Verificar firma digital para evitar envíos de puntajes falsos
    const dataString = String(alias) + String(score) + String(language) + String(duration) + String(timestamp);
    const rawSignatureHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, dataString + token, Utilities.Charset.UTF_8);
    const serverSignature = rawSignatureHash.map(function(e) {
      var v = (e < 0 ? e + 256 : e).toString(16);
      return v.length == 1 ? "0" + v : v;
    }).join("");

    if (serverSignature !== signature) {
      return response(403, "Firma digital inválida", headers);
    }

    // 2. Procesamiento en Google Sheets (Con control de concurrencia)
    const lock = LockService.getScriptLock();
    // Esperar hasta 10 segundos por el candado
    lock.waitLock(10000); 

    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Scores');
      const data = sheet.getDataRange().getValues();
      const hashedToken = hashToken(token);
    
    let updated = false;
    let found = false;
    let aliasTaken = false;

    // 1. Revisar si el alias ya está tomado por otro token en este idioma
    for (let i = 1; i < data.length; i++) {
      if (data[i][3] === language) {
        if (data[i][0] !== hashedToken && String(data[i][1]).toLowerCase() === alias.toLowerCase()) {
          aliasTaken = true;
          break;
        }
      }
    }

    if (aliasTaken) {
      return response(409, { success: false, error: 'ALIAS_TAKEN' }, headers);
    }

    // 2. Buscar si ya existe el token para ese idioma
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === hashedToken && data[i][3] === language) {
        found = true;
        const oldScore = Number(data[i][2]);
        if (score > oldScore) {
          // Actualizar récord
          sheet.getRange(i + 1, 2).setValue(alias);
          sheet.getRange(i + 1, 3).setValue(score);
          sheet.getRange(i + 1, 5).setValue(duration);
          sheet.getRange(i + 1, 6).setValue(timestamp);
          updated = true;
        }
        break;
      }
    }

    if (!found) {
      // Insertar nueva fila
      sheet.appendRow([hashedToken, alias, score, language, duration, timestamp]);
      updated = true;
    }

    if (updated) {
      // Invalidar la caché para que el próximo usuario vea los nuevos récords
      const cache = CacheService.getScriptCache();
      cache.remove('leaderboard_' + language);
    }

    return response(200, { success: true, updated: updated, finalAlias: alias }, headers);

    } finally {
      lock.releaseLock();
    }

  } catch (error) {
    return response(500, "Error del servidor: " + error.message, headers);
  }
}

function doGet(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const lang = e.parameter.lang || 'es';
    const cache = CacheService.getScriptCache();
    const cachedData = cache.get('leaderboard_' + lang);

    if (cachedData) {
      return response(200, JSON.parse(cachedData), headers);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Scores');
    const data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      return response(200, [], headers);
    }

    const records = [];
    // Empezar en 1 para saltar encabezados
    for (let i = 1; i < data.length; i++) {
      if (data[i][3] === lang) {
        records.push({
          hashedToken: data[i][0],
          alias: data[i][1],
          score: Number(data[i][2]),
          duration: data[i][4],
          timestamp: data[i][5]
        });
      }
    }

    // Ordenar de mayor a menor score, en caso de empate por el que lo logró antes
    records.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.timestamp - b.timestamp;
    });

    // Top 20
    const top20 = records.slice(0, 20);

    // Guardar en caché por 6 horas (21600 segundos)
    cache.put('leaderboard_' + lang, JSON.stringify(top20), 21600);

    return response(200, top20, headers);

  } catch (error) {
    return response(500, "Error del servidor: " + error.message, headers);
  }
}

// Para permitir CORS preflight
function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}

// Se eliminó la validación con Gemini

function response(code, payload, headers) {
  const isString = typeof payload === 'string';
  const data = isString ? { error: payload } : payload;
  
  // ContentService no soporta directamente establecer status code real (siempre devuelve 200 si no hay throw), 
  // pero añadiremos el success a la estructura.
  const body = {
    status: code,
    data: data
  };

  const output = ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
    
  return output;
}
