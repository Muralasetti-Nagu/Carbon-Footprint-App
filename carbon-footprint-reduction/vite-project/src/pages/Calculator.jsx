import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Calculator() {
  const [km, setKm] = useState('');
  const [kwh, setKwh] = useState('');
  const [diet, setDiet] = useState('veg');
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();

  const calculate = () => {
    // Get user identifier (try userId first, fallback to email)
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const userKey = userId || email;
    
    if (!userKey) {
      toast.error('User not logged in!');
      navigate('/login');
      return;
    }

    const car = parseFloat(km || 0) * 0.21;
    const elec = parseFloat(kwh || 0) * 0.5;
    const dietMap = { veg: 1.5, mixed: 2.5, nonveg: 3.3 };
    const totalEmission = car + elec + dietMap[diet];
    const emissionValue = totalEmission.toFixed(2);
    setTotal(emissionValue);

    const today = new Date().toISOString().split('T')[0];
    
    // Get existing emissions data
    const existing = JSON.parse(localStorage.getItem('emissions')) || {};

    // Get user-specific emissions (create if doesn't exist)
    const userEmissions = existing[userKey] || {};
    userEmissions[today] = Number(emissionValue);

    // Save back to localStorage
    existing[userKey] = userEmissions;
    localStorage.setItem('emissions', JSON.stringify(existing));

    // Also save current user's data separately for quick access
    localStorage.setItem(`user_${userKey}_emissions`, JSON.stringify(userEmissions));

    toast.success(`✅ Emission saved: ${emissionValue} kg CO₂`, {
      autoClose: 1500,
      onClose: () => navigate('/dashboard'),
    });
  };

  const reset = () => {
    setKm('');
    setKwh('');
    setDiet('veg');
    setTotal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Carbon Calculator
        </h2>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="KM travelled by car"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={km}
            onChange={(e) => setKm(e.target.value)}
          />
          <input
            type="number"
            placeholder="Electricity usage (kWh)"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={kwh}
            onChange={(e) => setKwh(e.target.value)}
          />
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="veg">Vegetarian</option>
            <option value="mixed">Mixed</option>
            <option value="nonveg">Non-Vegetarian</option>
          </select>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={calculate}
            className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-xl font-semibold hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>

        {total && (
          <p className="mt-6 text-center text-xl font-semibold text-green-700">
            🌿 Total Emissions: {total} kg CO₂
          </p>
        )}
      </div>
    </div>
  );
}
