import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const userKey = userId || email;
    
    if (!userKey) {
      console.error('No user logged in');
      return;
    }

    let userEmissions = {};
    
    const individualUserData = localStorage.getItem(`user_${userKey}_emissions`);
    if (individualUserData) {
      try {
        userEmissions = JSON.parse(individualUserData);
      } catch (e) {
        console.error('Error parsing individual user data:', e);
      }
    }
    
    if (Object.keys(userEmissions).length === 0) {
      const allEmissions = JSON.parse(localStorage.getItem('emissions')) || {};
      userEmissions = allEmissions[userKey] || {};
    }

    const formatted = Object.entries(userEmissions)
      .map(([date, emission]) => ({ day: date, emission: Number(emission) }))
      .sort((a, b) => new Date(a.day) - new Date(b.day));

    setChartData(formatted);
    if (formatted.length > 0) {
      setLatest(formatted[formatted.length - 1]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-6 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl transition-all duration-500 hover:shadow-green-200">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-6 flex items-center justify-center gap-2">
          📊 Emission Dashboard
        </h2>

        {latest && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-4 mb-8 text-center shadow-md">
            <p className="text-lg text-gray-700 font-medium">
              Last recorded emission on{' '}
              <span className="text-green-700 font-semibold">{latest.day}</span>:
            </p>
            <p className="text-3xl font-bold text-green-700 mt-2">
              🌿 {latest.emission} kg CO₂
            </p>
          </div>
        )}

        {chartData.length > 0 ? (
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#d1fae5" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis
                  label={{
                    value: 'Kg CO₂',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fill: '#16a34a' },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f0fdf4',
                    borderColor: '#16a34a',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey="emission"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10 text-lg">
            📉 No emission data available. Head over to{' '}
            <a
              href="/calculator"
              className="text-green-600 underline hover:text-green-800 font-semibold"
            >
              Carbon Calculator
            </a>{' '}
            to get started!
          </p>
        )}
      </div>
    </div>
  );
}
