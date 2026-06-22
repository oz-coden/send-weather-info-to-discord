function sendWeatherToDiscord() {
  const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL";
  const weatherApiKey = "YOUR_WEATHERAPI_KEY";
  const weatherLocation = "YOUR_LOCATION_NAME";

  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${weatherLocation}&days=1&aqi=no&alerts=no`;

  var date = new Date();
  var formattedDate = Utilities.formatDate(date, "Asia/Tokyo", "yyyy/MM/dd");

  try {
    const response = UrlFetchApp.fetch(apiUrl);
    const data = JSON.parse(response.getContentText());

    const dayData = data.forecast.forecastday[0].day;

    const todaysWeather = dayData.condition.text;
    const todaysTempMax = dayData.maxtemp_c;
    const todaysTempMin = dayData.mintemp_c;
    const todaysTempMean = dayData.avgtemp_c;
    const todaysHumidityMean = dayData.avghumidity;
    const todaysPop = dayData.daily_chance_of_rain;
    const todaysWindMax = dayData.maxwind_kph;

    const embedMessage = {
      "content": `This is ${weatherLocation}'s weather information on ` + formattedDate + "!",
      "embeds": [
        {
          "title": `${weatherLocation}'s weather information`,
          "description": "",
          "color": 5793266,
          "url": "https://www.weatherapi.com/",
          "footer": {
            "text": "Using WeatherAPI | Information may contain wrong content."
          },
          "fields": [
            {
              "name": "Weather:**" + todaysWeather + "**",
              "value": "",
              "inline": false
            },
            {
              "name": "Temp",
              "value": "Max. temp **" + todaysTempMax + "℃** / Min. temp **" + todaysTempMin + "℃** / Avg. temp **" + todaysTempMean + "℃**",
              "inline": false
            },
            {
              "name": "Humidity",
              "value": "Avg. Humidity **" + todaysHumidityMean + "%**",
              "inline": false
            },
            {
              "name": "Pops",
              "value": "Pop. **" + todaysPop + "%**",
              "inline": false
            },
            {
              "name": "Winds",
              "value": "Max. wind **" + todaysWindMax + " km/h**",
              "inline": false
            }
          ]
        }
      ]
    };

    UrlFetchApp.fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      payload: JSON.stringify(embedMessage),
    });

  } catch (error) {
    Logger.log(`error: ${error.toString()}`);
  }
}
