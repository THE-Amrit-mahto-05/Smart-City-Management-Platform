import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';

const TrafficData = () => {
  const [trafficRecords, setTrafficRecords] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const response = await axiosClient.get('/traffic');
        setTrafficRecords(response.data);
      } catch (err) {
        setError('Failed to load traffic data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrafficData();
  }, []);

  if (loading) return <div>Loading traffic data...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Traffic Data</h2>
      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Location ID</th>
            <th className="p-2 border">Timestamp</th>
            <th className="p-2 border">Vehicle Count</th>
            <th className="p-2 border">Average Speed</th>
            <th className="p-2 border">Congestion Level</th>
          </tr>
        </thead>
        <tbody>
          {trafficRecords.map(({ id, locationId, timestamp, vehicleCount, avgSpeed, congestionLevel }) => (
            <tr key={id} className="text-center border-t border-gray-300">
              <td className="p-2 border">{locationId}</td>
              <td className="p-2 border">{new Date(timestamp).toLocaleString()}</td>
              <td className="p-2 border">{vehicleCount}</td>
              <td className="p-2 border">{avgSpeed}</td>
              <td className="p-2 border">{congestionLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrafficData;
