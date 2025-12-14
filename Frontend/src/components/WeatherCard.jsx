import React from 'react';

const WeatherCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">{data.city}</h2>
          <p className="text-sm text-blue-100">{data.country}</p>
        </div>
        {data.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.description}
          />
        )}
      </div>

      <div className="mt-4 flex gap-8 flex-wrap">
        <div>
          <p className="text-sm text-blue-100">Temperature</p>
          <p className="text-4xl font-semibold">
            {Math.round(data.temperature)}°C
          </p>
          <p className="text-xs text-blue-100">
            Feels like {Math.round(data.feelsLike)}°C
          </p>
        </div>
        <div>
          <p className="text-sm text-blue-100">Humidity</p>
          <p className="text-2xl">{data.humidity}%</p>
        </div>
        <div>
          <p className="text-sm text-blue-100">Wind</p>
          <p className="text-2xl">{Math.round(data.windSpeed)} m/s</p>
        </div>
      </div>

      <p className="mt-4 capitalize">{data.description}</p>
    </div>
  );
};

export default WeatherCard;
