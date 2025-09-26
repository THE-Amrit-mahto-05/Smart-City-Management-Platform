import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const EnergyUsageData = () => {
  const [energyData, setEnergyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnergyData = async () => {
      try {
        const response = await axiosClient.get('/energy');
        setEnergyData(response.data.data); // Based on your backend structure
      } catch (err) {
        setError('Failed to fetch energy data.');
      } finally {
        setLoading(false);
      }
    };
    fetchEnergyData();
  }, []);

  if (loading) return <div>Loading energy data...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Energy Usage Data</h2>
      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Region</th>
            <th className="p-2 border">Thermal Actual (MU)</th>
            <th className="p-2 border">Thermal Estimated (MU)</th>
            <th className="p-2 border">Nuclear Actual (MU)</th>
            <th className="p-2 border">Hydro Actual (MU)</th>
            {/* Add more columns as per your data */}
          </tr>
        </thead>
        <tbody>
          {energyData.map((record, index) => (
            <tr key={index} className="text-center border-t border-gray-300">
              <td className="p-2 border">{new Date(record.date).toLocaleDateString()}</td>
              <td className="p-2 border">{record.region}</td>
              <td className="p-2 border">{record.thermalActual}</td>
              <td className="p-2 border">{record.thermalEstimated}</td>
              <td className="p-2 border">{record.nuclearActual}</td>
              <td className="p-2 border">{record.hydroActual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnergyUsageData;
