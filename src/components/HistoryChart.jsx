import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const HistoryChart = () => {
  const { coinId } = useParams();
  const [data, setData] = useState([]);
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${api_url}/api/history/${coinId}`, {
          headers: {
            Authorization: token,
          },
        });
        const formatted = res.data.map((entry) => ({
          ...entry,
          timestamp: new Date(entry.timestamp).toLocaleString(),
        }));
        setData(formatted);
      } catch (err) {
        console.error('Error loading chart data:', err);
      }
    };

    if (coinId) {
      fetchHistory();
    }
  }, [coinId]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 p-4 overflow-auto">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-5xl">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">{coinId} Price History</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#2563EB" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoryChart;
