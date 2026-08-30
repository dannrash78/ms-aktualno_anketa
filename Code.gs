function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var SPREADSHEET_ID = "1AA-cQk5AywsnkW98ZZOt9ha7vKvGzkxxQKFAUj_a4SQ";
    var SHEET_NAME = "Отговори";
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    var headers = [
      "timestamp","years_ms","age","smoking","smoking_since",
      "smoking_amount",
      "smoking_quit_since","alcohol","alcohol_amount","edss_diagnosis","edss_current",
      "symptoms","symptoms_other","what_helps","relapse_12m","mri_12m","walking_aid","daily_impact",
      "therapy_status","therapy_first","therapy_first_other","therapy_second","therapy_second_other","therapy_other",
      "hsct","hsct_time","hsct_edss_before","hsct_edss_change","hsct_effects",
      "diet","diet_type","diet_other","exercise","exercise_type","exercise_other","exercise_frequency","exercise_duration","consent"
    ];
    if (sheet.getLastRow() === 0) sheet.appendRow(headers);
    sheet.appendRow(headers.map(function(h){ return data[h] !== undefined ? data[h] : ""; }));
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
