## 前提環境
- ローカル実行の場合
    - node jsインストール済
    - npmインストール済
    - claspインストール済(sudo npm i @google/clasp -g)
- docker実行の場合
    - dockerインストール済
- https://script.google.com/home/usersettings　にてGoogle Apps Script APIを有効化する

## Clasp環境構築
- ローカル実行の場合  
```clasp login```  
ブラウザが立ち上がるのでGoogleアカウントにログインする。

- docker実行の場合  

``` 
docker-compose build
docker-compose run clasp bash
cd (任意のディレクトリ)
clasp login --no-localhost
```  

URLが表示されるので、（恐らく長くて改行されているので適宜修正する）
ブラウザを立ち上げてURLにアクセスし、Googleアカウントにログインする。  
その後、表示された文字列をdocker上で貼り付ける。

## What is Clasp
gasのダウンロードやデプロイ等がローカルからできるツール
https://qiita.com/soundTricker/items/354a993e354016945e44

## How to use clasp(cheetSheet)
### clone
1. GASのスクリプト編集画面からファイル->プロジェクトのプロパティより
**スクリプトID**をコピー
2. ```clasp clone [**スクリプトID**]```でcurrentのディレクトリへclone

### run
※対象APIが実行可能APIとして導入されていること  
```clasp run [function名]```

### push
.clasp.jsonのあるディレクトリで  
```clasp push```
