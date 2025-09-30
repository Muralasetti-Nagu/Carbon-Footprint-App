function Suggestions() {
  const tips = [
    "Use energy-efficient appliances and switch off when not in use.",
    "Use public transport, bike, or walk instead of driving.",
    "Reduce meat consumption and avoid food waste.",
    "Use renewable energy sources if available.",
    "Plant trees and support reforestation.",
    "Recycle and reuse items wherever possible.",
    "Buy locally produced goods to reduce transportation emissions.",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Suggestions to Reduce Your Carbon Footprint</h2>
      <ul className="space-y-4">
        {tips.map((tip, idx) => (
          <li key={idx} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition text-gray-800">
            🌱 {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
