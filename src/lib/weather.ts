/**
 * Weather Utility for Aura
 * Uses Open-Meteo (free, no API key required)
 */

export interface DailyForecast {
    date: string;
    tempMax: number;
    weatherCode: number;
    condition: string;
}

export interface WeatherData {
    temp: number;
    condition: string;
    location: string;
    isDay: boolean;
    weatherCode: number;
    forecast: DailyForecast[];
}

// Maps WMO Weather interpretation codes to human readable conditions
// https://open-meteo.com/en/docs
const weatherCodeMap: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
};

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code&daily=weather_code,temperature_2m_max&timezone=auto`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather fetch failed");

        const data = await response.json();
        const current = data.current;
        const daily = data.daily;

        const forecast: DailyForecast[] = daily.time.map((time: string, index: number) => ({
            date: time,
            tempMax: Math.round(daily.temperature_2m_max[index]),
            weatherCode: daily.weather_code[index],
            condition: weatherCodeMap[daily.weather_code[index]] || "Sunny",
        }));

        return {
            temp: Math.round(current.temperature_2m),
            condition: weatherCodeMap[current.weather_code] || "Sunny",
            location: "Current Location",
            isDay: current.is_day === 1,
            weatherCode: current.weather_code,
            forecast,
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
}

/**
 * Get location name from coordinates using OpenStreetMap Nominatim (Free)
 */
export async function reverseGeocode(lat: number, lon: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Aura-App-Rebranding-Verification'
            }
        });
        if (!response.ok) return "Unknown Location";

        const data = await response.json();
        const address = data.address;

        // Attempt to get a nice short name (City or Town)
        return address.city || address.town || address.village || address.suburb || "London, UK";
    } catch (error) {
        console.error("Error reverse geocoding:", error);
        return "London, UK";
    }
}
