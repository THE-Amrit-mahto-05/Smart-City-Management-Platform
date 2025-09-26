import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axiosClient.get('/alerts');
        setAlerts(response.data);
      } catch (err) {
        setError('Failed to load alerts.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) return <div>Loading alerts...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Alerts & Notifications</h2>
      <ul className="list-disc list-inside max-h-64 overflow-y-auto border border-gray-300 p-4 rounded">
        {alerts.length === 0 && <li>No alerts at the moment.</li>}
        {alerts.map(({ id, message, status, createdAt }) => (
          <li key={id} className={`mb-2 ${status === 'PENDING' ? 'font-bold' : ''}`}>
            [{new Date(createdAt).toLocaleString()}] {message} - <em>{status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
