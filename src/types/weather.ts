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
  temp: string;
}

export type HourlyForecastItem = {
  hour: string;
  temp: string;
}