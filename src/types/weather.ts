export type WeatherCondition =
  | 'sunny'
  | 'rain'
  | 'cloudy'
  | 'storm'
  | 'snow'
  | 'fog'
  | 'drizzle';

export type CurrentWeather = {
  country: string;
  city: string;
  date: string;
  temp: string;
  feelsLike: string;
  humidity: string;
  wind: string;
  precipitation: string;
}

export type DailyForecastItem = {
  day: string;
  condition: WeatherCondition;
  high: string;
  low: string;
}

export type HourlyForecastItem = {
  hour: string;
  condition: WeatherCondition;
  temp: string;
}