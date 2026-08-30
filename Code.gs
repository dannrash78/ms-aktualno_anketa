function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var SPREADSHEET_ID = "1AA-cQk5AywsnkW98ZZOt9ha7vKvGzkxxQKFAUj_a4SQ";
    var SHEET_NAME = "Отговори";

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // This is the complete list of fields currently sent by index.html.
    var headers = [
      "Дата и час",
      "Години с МС",
      "Възраст",
      "Пушене",
      "Пушене – от колко години",
      "Пушене – количество",
      "Пушене – отказване преди",
      "Алкохол",
      "Алкохол – честота",
      "Алкохол – вид",
      "Слабоалкохолни – количество",
      "Силноалкохолни – количество",
      "EDSS при диагностициране",
      "EDSS в момента",
      "Основни симптоми",
      "Симптоми – друго",
      "Какво помага за симптомите",
      "Пристъп/рецидив през последните 12 месеца",
      "ЯМР през последните 12 месеца",
      "Помощно средство за ходене",
      "Влияние на МС върху ежедневието",
      "Терапия за МС",
      "Терапия – първа линия",
      "Терапия – първа линия – друго",
      "Терапия – втора линия",
      "Терапия – втора линия – друго",
      "Терапия – друго",
      "HSCT",
      "HSCT – преди колко време",
      "EDSS преди HSCT",
      "EDSS след HSCT",
      "Как повлия HSCT като цяло",
      "Хранителни добавки",
      "Видове хранителни добавки",
      "Добавки – друго",
      "Витамин D – дневна доза",
      "Диета/хранителен режим",
      "Вид диета",
      "Диета – друго",
      "Физическа активност",
      "Вид физическа активност",
      "Физическа активност – друго",
      "Физическа активност – честота",
      "Физическа активност – продължителност",
      "Съгласие"
    ];

    // Create/update the header row without deleting existing responses.
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    } else {
      var lastColumn = Math.max(sheet.getLastColumn(), 1);
      var existingHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0]
        .map(function(h) { return String(h || "").trim(); });

      var existingSet = {};
      existingHeaders.forEach(function(h) {
        if (h) existingSet[h] = true;
      });

      var missing = headers.filter(function(h) { return !existingSet[h]; });

      if (missing.length) {
        var startCol = existingHeaders.length + 1;
        sheet.getRange(1, startCol, 1, missing.length).setValues([missing]);
        existingHeaders = existingHeaders.concat(missing);
      }
    }

    // Build a map from the actual sheet headers to the submitted payload.
    var lastColumnNow = sheet.getLastColumn();
    var finalHeaders = sheet.getRange(1, 1, 1, lastColumnNow).getValues()[0]
      .map(function(h) { return String(h || "").trim(); });

    var labelToKey = {
      "Дата и час": "timestamp",
      "Години с МС": "years_ms",
      "Възраст": "age",
      "Пушене": "smoking",
      "Пушене – от колко години": "smoking_since",
      "Пушене – количество": "smoking_amount",
      "Пушене – отказване преди": "smoking_quit_since",
      "Алкохол": "alcohol",
      "Алкохол – честота": "alcohol_frequency",
      "Алкохол – вид": "alcohol_type",
      "Слабоалкохолни – количество": "alcohol_weak_amount",
      "Силноалкохолни – количество": "alcohol_strong_amount",
      "EDSS при диагностициране": "edss_diagnosis",
      "EDSS в момента": "edss_current",
      "Основни симптоми": "symptoms",
      "Симптоми – друго": "symptoms_other",
      "Какво помага за симптомите": "what_helps",
      "Пристъп/рецидив през последните 12 месеца": "relapse_12m",
      "ЯМР през последните 12 месеца": "mri_12m",
      "Помощно средство за ходене": "walking_aid",
      "Влияние на МС върху ежедневието": "daily_impact",
      "Терапия за МС": "therapy_status",
      "Терапия – първа линия": "therapy_first",
      "Терапия – първа линия – друго": "therapy_first_other",
      "Терапия – втора линия": "therapy_second",
      "Терапия – втора линия – друго": "therapy_second_other",
      "Терапия – друго": "therapy_other",
      "HSCT": "hsct",
      "HSCT – преди колко време": "hsct_time",
      "EDSS преди HSCT": "hsct_edss_before",
      "EDSS след HSCT": "hsct_edss_change",
      "Как повлия HSCT като цяло": "hsct_effects",
      "Хранителни добавки": "supplements",
      "Видове хранителни добавки": "supplement_type",
      "Добавки – друго": "supplements_other",
      "Витамин D – дневна доза": "vitamin_d_dose",
      "Диета/хранителен режим": "diet",
      "Вид диета": "diet_type",
      "Диета – друго": "diet_other",
      "Физическа активност": "exercise",
      "Вид физическа активност": "exercise_type",
      "Физическа активност – друго": "exercise_other",
      "Физическа активност – честота": "exercise_frequency",
      "Физическа активност – продължителност": "exercise_duration",
      "Съгласие": "consent"
    };

    var row = finalHeaders.map(function(header) {
      var key = labelToKey[header];
      return key && data[key] !== undefined ? data[key] : "";
    });

    sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);

    return ContentService
      .createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok:false, error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
