import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const AirQualityData = () => {
  const [aqData, setAqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const response = await axiosClient.get('/air-quality');
        setAqData(response.data);
      } catch (err) {
        setError('Failed to fetch air quality data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAirQuality();
  }, []);

  if (loading) return <div>Loading air quality data...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Air Quality Data</h2>
      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Location ID</th>
            <th className="p-2 border">Timestamp</th>
            <th className="p-2 border">AQI</th>
            <th className="p-2 border">PM2.5</th>
            <th className="p-2 border">PM10</th>
            <th className="p-2 border">CO2</th>
            <th className="p-2 border">O3</th>
          </tr>
        </thead>
        <tbody>
          {aqData.map(({ id, locationId, timestamp, AQI, pm25, pm10, co2, o3 }) => (
            <tr key={id} className="text-center border-t border-gray-300">
              <td className="p-2 border">{locationId}</td>
              <td className="p-2 border">{new Date(timestamp).toLocaleString()}</td>
              <td className="p-2 border">{AQI}</td>
              <td className="p-2 border">{pm25}</td>
              <td className="p-2 border">{pm10}</td>
              <td className="p-2 border">{co2}</td>
              <td className="p-2 border">{o3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AirQualityData;
