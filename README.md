# Discordに天気情報を通知

Google Apps Script (GAS) と WeatherAPI を使用して、指定した地域の天気予報を毎日DiscordのWebhookを使って通知するスクリプトです。
Open-Meteo等のAPIをGASで実行する際に発生しやすいIPに基づくレート制限に引っかからないために、WeatherAPIを採用しています。

## 必要なもの

このスクリプトを動かすには以下の準備と環境が必要です。

1. **Discord サーバーと Webhook URL**
   - 天気を通知したいチャンネルの設定から「連携サービス」>「ウェブフック」を作成し、URLを取得してください。
2. **WeatherAPI の APIキー**
   - [WeatherAPI.com](https://www.weatherapi.com/) で無料アカウントを作成し、APIキー（API Key）を取得してください。
3. **Google アカウント**
   - スクリプトを実行するための Google Apps Script 環境が必要です。

## 留意事項

これを動かすには、以下の該当する部分を書き換える必要があります。
```javascript
  const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL";
  const weatherApiKey = "YOUR_WEATHERAPI_KEY";
  const weatherLocation = "YOUR_LOCATION_NAME";
  const timezone = "YOUR_TIMEZONE";
```
また、内容は英語になっているので、必要であれば書き換えて日本語に書き換える必要があります。なお、APIから得られる内容については、URLのパラメーターに`lang=ja`を付け加えることで、天気情報の一部を日本語で受け取ることができます。
