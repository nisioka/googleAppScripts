/**
 * Autifyのデータを全てシートに反映する。
 **/
function allUpdate() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const secrets = ss.getSheetByName("secrets").getRange("B1:B10").getValues();
  init(secrets[0][0], secrets[1][0]);

  updateScenarios(ss);
  updateResults(ss);
}

/**
 * Autifyのシナリオをシートに反映する。
 * @param ss スプレッドシートオブジェクト
 **/
function updateScenarios(ss) {
  const sheet = ss.getSheetByName("data_scenarios");
  const scenarios = getScenarios();
  const data_scenarios = sheet.getRange(1,1,scenarios.length,scenarios[0].length);
  sheet.clearContents(); // 書き込み直前にシートの内容をクリア。
  data_scenarios.setValues(scenarios);
}

/**
 * Autifyのテスト結果をシートに反映する。
 * @param ss スプレッドシートオブジェクト
 **/
function updateResults(ss) {
  const sheet = ss.getSheetByName("data_results");
  const results = getResults();
  const data_results = sheet.getRange(1,1,results.length,results[0].length);
  sheet.clearContents(); // 書き込み直前にシートの内容をクリア。
  data_results.setValues(results);
}