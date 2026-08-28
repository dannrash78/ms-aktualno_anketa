function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Постави ID на Google Spreadsheet, в който искаш да се пазят отговорите.
    var SPREADSHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";
    var SHEET_NAME = "Отговори";

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    var headers = [
      "timestamp",
      "years_ms",
      "age",
      "smoking",
      "alcohol",
      "edss_diagnosis",
      "edss_current",
      "diet",
      "diet_type",
      "diet_other",
      "exercise",
      "exercise_type",
      "exercise_other",
      "exercise_frequency",
      "exercise_duration",
      "consent"
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    sheet.appendRow(headers.map(function(h) {
      return data[h] !== undefined ? data[h] : "";
    }));

    return ContentService
      .createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok: false, error: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
