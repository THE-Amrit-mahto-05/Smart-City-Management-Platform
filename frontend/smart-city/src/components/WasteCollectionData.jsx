import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const WasteCollectionData = () => {
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWasteData = async () => {
      try {
        const response = await axiosClient.get('/waste');
        setWasteData(response.data);
      } catch (err) {
        setError('Failed to fetch waste collection data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWasteData();
  }, []);

  if (loading) return <div>Loading waste collection data...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Waste Collection Data</h2>
      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Bin ID</th>
            <th className="p-2 border">Location ID</th>
            <th className="p-2 border">Timestamp</th>
            <th className="p-2 border">Fill Level</th>
            <th className="p-2 border">Last Emptied</th>
          </tr>
        </thead>
        <tbody>
          {wasteData.map(({ id, binId, locationId, timestamp, fillLevel, lastEmptied }) => (
            <tr key={id} className="text-center border-t border-gray-300">
              <td className="p-2 border">{binId}</td>
              <td className="p-2 border">{locationId}</td>
              <td className="p-2 border">{new Date(timestamp).toLocaleString()}</td>
              <td className="p-2 border">{fillLevel}</td>
              <td className="p-2 border">{lastEmptied ? new Date(lastEmptied).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WasteCollectionData;
