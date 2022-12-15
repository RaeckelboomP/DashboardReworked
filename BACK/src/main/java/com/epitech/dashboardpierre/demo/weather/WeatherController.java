package com.epitech.dashboardpierre.demo.weather;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@SuppressWarnings({"unchecked", "rawtypes"})
@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WeatherController {

	/**
	 * 
	 * @param city
	 * @return A HashMap<String, String> of the city datas, label, longitude and latitude. 
	 */
	private HashMap<String, String> getCityDatas(String city) {
		String urlAd = "https://api-adresse.data.gouv.fr/search/?q=" + city + "&type=municipality&autocomplete=1";
		RestTemplate restTemplate1 = new RestTemplate();
		JSONObject result1 = restTemplate1.getForObject(urlAd, JSONObject.class);
		List<JSONObject> features = (List<JSONObject>) result1.get("features");
		JSONObject feat = new JSONObject(features.get(0));
		JSONObject geo = new JSONObject((Map) feat.get("geometry"));
		List<Double> coordinates = (List<Double>) geo.get("coordinates");
		JSONObject proper = new JSONObject((Map) feat.get("properties"));
		String label = proper.get("label").toString();
		HashMap<String, String> cityDatas = new HashMap<>();
		cityDatas.put("label", label);
		cityDatas.put("latitude", Double.toString(coordinates.get(1)));
		cityDatas.put("longitude", Double.toString(coordinates.get(0)));
		return cityDatas;
	}

	/**
	 * 
	 * @param city
	 * @return a JSON String containing weather's data from the asked city
	 */
	@GetMapping("/weather")
	public JSONObject getActualWeather(@RequestParam String city) {

		HashMap<String, String> cityDatas = getCityDatas(city);
		String latitude = cityDatas.get("latitude");
		String longitude = cityDatas.get("longitude");
		String label = cityDatas.get("label");

		String url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude="
				+ longitude + "&current_weather=true";
		RestTemplate restTemplate = new RestTemplate();
		JSONObject result = restTemplate.getForObject(url, JSONObject.class);
		JSONObject current = new JSONObject((Map) result.get("current_weather"));
		String time = current.get("time").toString().substring(0, 10);

		String temperature = current.get("temperature").toString();
		String windspeed = current.get("windspeed").toString();
		String winddirection = current.get("winddirection").toString();
		Integer weathercode = (Integer) current.get("weathercode");

		HashMap<String, String> weatherAndPicture = getWeatherAndPicture(weathercode);
		String temps = weatherAndPicture.get("weather");
		String picture = weatherAndPicture.get("picture");

		HashMap<String, String> actualWeatherDatas = new HashMap<>();
		actualWeatherDatas.put("label", label);
		actualWeatherDatas.put("temperature", temperature);
		actualWeatherDatas.put("winddirection", winddirection);
		actualWeatherDatas.put("windspeed", windspeed);
		actualWeatherDatas.put("picture", picture);
		actualWeatherDatas.put("temps", temps);
		actualWeatherDatas.put("date", time);
		JSONObject jsonActualWeatherDatas = new JSONObject(actualWeatherDatas);
		return jsonActualWeatherDatas;
	}

	/**
	 * 
	 * @param weathercode
	 * @return A HashMap<String, String> of two String representing the weather and an url of the relevant picture
	 */
	private HashMap<String, String> getWeatherAndPicture(int weathercode) {
		HashMap<String, String> weatherAndPicture = new HashMap<>();
		String temps = "";
		String picture = "";
		switch(weathercode){
			case 0:
			temps = "Clear sky";
			picture = "<i class=\"qi-sunny\"></i>";
			break;

			case 1:
			temps = "Mainly clear";
			picture = "<i class=\"qi-few-clouds\"></i>";
			break;

			case 2:
			temps = "Partly cloudy";
			picture = "<i class=\"qi-cloudy\"></i>";
			break;

			case 3:
			temps = "Overcast";
			picture = "<i class=\"qi-overcast\"></i>";
			break;

			case 45:
			temps = "Fog";
			picture = "<i class=\"qi-foggy\"></i>";
			break;

			case 48:
			temps = "Depositing rime fog";
			picture = "<i class=\"qi-foggy\"></i>";
			break;
			
			case 51:
			case 55:
			case 53:
			case 56:
			case 57:
			temps = "Drizzle";
			picture = "<i class=\"qi-drizzle-rain\"></i>";
			break;

			case 61:
			case 66:
			temps = "Light rain";
			picture = "<i class=\"qi-light-rain\"></i>";
			break;
			
			case 63:
			temps = "Moderate rain";
			picture = "<i class=\"qi-moderate-rain\"></i>";
			break;
			
			case 65:
			case 67:
			temps = "Heavy intensity rain";
			picture = "<i class=\"qi-heavy-rain\"></i>";
			break;

			case 71:
			temps = "Light snow fall";
			picture = "<i class=\"qi-light-snow\"></i>";
			break;

			case 73:
			temps = "Moderate snow fall";
			picture = "<i class=\"qi-moderate-snow\"></i>";
			break;

			case 75:
			temps = "Heavy snow fall";
			picture = "<i class=\"qi-heavy-snow\"></i>";
			break;

			case 77:
			temps = "Hail";
			picture = "<i class=\"qi-hail\"></i>";
			break;

			case 80:
			case 81:
			temps = "Shower rain";
			picture = "<i class=\"qi-shower-rain\"></i>";
			break;

			case 82:
			temps = "Heavy shower rain";
			picture = "<i class=\"qi-heavy-shower-rain\"></i>";
			break;

			case 85:
			temps = "Light snow shower";
			picture = "<i class=\"qi-shower-snow\"></i>";
			break;

			case 86:
			temps = "Snow shower";
			picture = "<i class=\"qi-shower-flurry\"></i>";
			break;

			case 95:
			temps = "Thundershower";
			picture = "<i class=\"qi-thundershower\"></i>";
			break;

			case 96:
			case 99:
			temps = "Thundershower with hail";
			picture = "<i class=\"qi-thundershower-with-hail\"></i>";
			break;
		}
		weatherAndPicture.put("weather", temps);
		weatherAndPicture.put("picture", picture);
		return weatherAndPicture;
	}
	
	@GetMapping("/weatherHourly")
	public List<Object> hourlyDataList(@RequestParam String city){
		List<Object> allData = new ArrayList<>();
		List<Object> hourlyData = new ArrayList<>();
		
		JSONObject weatherDatas = getActualWeather(city);
		HashMap<String, String> cityDatas = getCityDatas(city);
		String latitude = cityDatas.get("latitude");
		String longitude = cityDatas.get("longitude");
		String time = java.time.LocalDate.now().toString();

		String urlHourly = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude="
				+ longitude
				+ "&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m,winddirection_10m&start_date="
				+ time + "&end_date=" + time;
		RestTemplate restTemplate = new RestTemplate();
		JSONObject result = restTemplate.getForObject(urlHourly, JSONObject.class);

		JSONObject hourly = new JSONObject((Map) result.get("hourly"));
		List<Object> temperatureH = (List<Object>) hourly.get("temperature_2m");
		List<Object> weathercodeH = (List<Object>) hourly.get("weathercode");
		List<Object> humidity = (List<Object>) hourly.get("relativehumidity_2m");
		List<Object> precipitation = (List<Object>) hourly.get("precipitation");
		List<Object> winddirectionH = (List<Object>) hourly.get("winddirection_10m");
		List<Object> windspeedH = (List<Object>) hourly.get("windspeed_10m");
		List<Object> timeH = (List<Object>) hourly.get("time");

		for (int i = 0; i < timeH.size(); i++) {
			Object temp = temperatureH.get(i);
			int weatherCode = (int) weathercodeH.get(i);

			HashMap<String, String> weatherAndPicture = getWeatherAndPicture(weatherCode);
			String temps1 = weatherAndPicture.get("weather");
			String picture1 = weatherAndPicture.get("picture");
			Object humid = humidity.get(i);
			Object precip = precipitation.get(i);
			Object winddir = winddirectionH.get(i);
			Object windspe = windspeedH.get(i);
			Object tim = timeH.get(i);

			HashMap<String, String> hourData = new HashMap<>();
			hourData.put("time", tim.toString());
			hourData.put("temperature", temp.toString());
			hourData.put("picture", picture1);
			hourData.put("weather", temps1);
			hourData.put("humidity", humid.toString());
			hourData.put("precipitation", precip.toString());
			hourData.put("windDirection", winddir.toString());
			hourData.put("windSpeed", windspe.toString());

			hourlyData.add(hourData);
		}

		allData.add(weatherDatas);
		allData.add(hourlyData);

		return allData;
	}
}
