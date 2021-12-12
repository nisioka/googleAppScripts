const API_URL = "https://app.autify.com/api/v1/"
let ACCESS_TOKEN;
let PROJECT_ID;

/**
 * アクセス情報の初期化。<br>
 * 最初に呼び出すこと。
 * @param accessToken Autifyのユーザアクセストークン
 * @param projectId AutifyのプロジェクトID
 **/
function init(accessToken, projectId) {
  ACCESS_TOKEN = accessToken;
  PROJECT_ID = projectId;
}

/**
 * テストシナリオを取得する。<br>
 * 繰り返しAPIを実行する（上限30×100ページ）。
 * @return テストシナリオ情報の2次元配列。
 **/
function getScenarios() {
  let results = [];
  const mainFieldRow = ["id", "name", "project_url", "created_at", "updated_at"];
  results.push(mainFieldRow);
  for (let i = 1; i <= 100; i++) {
    const response = fetchAutify(`projects/${PROJECT_ID}/scenarios?page=${i}`, "GET");
    if (response.getContentText().length < 3) {
      break;
    }
    jsonTo2dArray(results, JSON.parse(response.getContentText()), mainFieldRow);
  }
  return results;
}

/**
 * テストシナリオを取得する。<br>
 * 繰り返しAPIを実行する（上限100×100ページ）。
 * @return テスト結果情報の2次元配列。
 **/
function getResults() {
  let results = [];
  const mainFieldRow = ["id", "status", "duration", "started_at", "finished_at", "created_at", "updated_at"]
  const subField = "test_plan";
  const subFieldRow = ["id", "name", "created_at", "updated_at"]
  results.push(subFieldRow ? mainFieldRow.concat(subFieldRow.map(function (value) { return subField + "." + value })) : mainFieldRow);

  for (let i = 1; i <= 100; i++) {
    const response = fetchAutify(`projects/${PROJECT_ID}/results?per_page=100&page=${i}`, "GET");
    if (response.getContentText().length < 3) {
      break;
    }
    jsonTo2dArray(results, JSON.parse(response.getContentText()), mainFieldRow, subField, subFieldRow);
  }
  return results;
}

/**
 * AutifyのAPIを実行する。
 * @param url URL
 * @param method httpメソッド文字列
 * @return httpレスポンス
 **/ 
function fetchAutify(url, method) {
  const options = {
    'method': method,
    'headers': {
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
      'accept': 'application/json'
    },
  };
  return UrlFetchApp.fetch(API_URL + url, options);
}

/**
 * jsonを2次元配列に置き換える。<br>
 * 内部に0～1つまでlistがある場合もsubFieldを指定することで対応可能。
 * @param results (必須)結果の2次元配列。これに取得結果を追加していく。
 * @param json (必須)インプットとなるJSON文字列。
 * @param mainFieldRow (必須)jsonが持つフィールドを1次元文字列配列で列挙。
 * @param subField (任意)json内のlistも出力したい場合に指定。指定した場合subFieldRowは必須。
 * @param subFieldRow (任意)json内のlistも出力したい場合にそのフィールドを1次元文字列配列で指定。
 * @return 変換後2次元配列
 **/ 
function jsonTo2dArray(results, json, mainFieldRow, subField, subFieldRow) {
  for (const dataMap of json) {
    let row = new Array(mainFieldRow.length + (subFieldRow ? subFieldRow.length : 0));
    for (const [key, value] of Object.entries(dataMap)) {
      for (let i = 0; i < mainFieldRow.length; i++) {
        if (!value) {
          continue;
        }
        if (key === subField) {
          for (const [subKey, subValue] of Object.entries(value)) {
            for (let j = 0; j < subFieldRow.length; j++) {
              if (subKey === subFieldRow[j]) {
                row[mainFieldRow.length + j] = subValue;
              }
            }
          }
        } else if (key === mainFieldRow[i]) {
          row[i] = value;
        }
      }
    }
    results.push(row);
  }
  return results;
}