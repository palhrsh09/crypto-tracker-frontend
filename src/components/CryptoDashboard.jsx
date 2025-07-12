import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CryptoDashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;

  const fetchCoins = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${api_url}/api/coins`, {
        headers: {
          Authorization: token,
        },
      });
      setCoins(response.data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortField === 'name' || sortField === 'symbol') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start bg-gray-100 p-4 overflow-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-white bg-gray-800 p-4 rounded">
        Crypto Tracker
      </h1>
      <input
        type="text"
        placeholder="Search by name or symbol..."
        value={search}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full max-w-2xl bg-gray-800 text-white border-gray-600"
      />
      <div className="w-full overflow-x-auto max-h-[75vh] overflow-y-auto">
        <table className="min-w-full bg-gray-800 text-white border border-gray-600">
          <thead className="sticky top-0 bg-gray-900 z-10">
            <tr>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('name')}>
                Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('symbol')}>
                Symbol {sortField === 'symbol' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('price')}>
                Price (USD) {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('marketCap')}>
                Market Cap {sortField === 'marketCap' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSort('change24h')}>
                24h % Change {sortField === 'change24h' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 border">Last Updated</th>
              <th className="px-4 py-2 border">Chart</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr key={coin.coinId} className="hover:bg-gray-700">
                <td className="px-4 py-2 border">{coin.name}</td>
                <td className="px-4 py-2 border">{coin.symbol}</td>
                <td className="px-4 py-2 border">
                  ${coin.price ? coin.price.toFixed(2) : 'N/A'}
                </td>
                <td className="px-4 py-2 border">
                  ${coin.marketCap ? coin.marketCap.toLocaleString() : 'N/A'}
                </td>
                <td
                  className={`px-4 py-2 border ${
                    coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {coin.change24h !== undefined ? `${coin.change24h.toFixed(2)}%` : 'N/A'}
                </td>
                <td className="px-4 py-2 border">
                  {coin.timestamp ? new Date(coin.timestamp).toLocaleString() : 'N/A'}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    onClick={() => navigate(`/chart/${coin.coinId}`)}
                  >
                    View Chart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoDashboard;
