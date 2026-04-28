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
  condition: WeatherCondition;
}

export type DailyForecastItem = {
  date: string;
  day: string;
  fullDay: string,
  condition: WeatherCondition;
  high: string;
  low: string;
}

export type HourlyForecastItem = {
  date: string;
  dateTime: string;
  hour: string;
  condition: WeatherCondition;
  temp: string;
}

export type UnitsState = {
  temperature: 'celsius' | 'fahrenheit';
  windspeed: 'kmh' | 'mph';
  precipitation: 'mm' | 'inch';
}

export type UnitsSelectorProps = {
  units: UnitsState;
  onUnitsChange: React.Dispatch<React.SetStateAction<UnitsState>>;
}

export type ErrorStateProps = {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}