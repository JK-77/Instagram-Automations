"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Review {
  id: string;
  message: string;
  createdAt: string;
  sentiment: "positive" | "negative" | "neutral";
}

export default function CheckMyReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ positive: 0, negative: 0, neutral: 0 });

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data.reviews || []);
        setStats({
          positive: data.positiveComments || 0,
          negative: data.negativeComments || 0,
          neutral: data.neutralComments || 0,
        });
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchReviews();
  }, []);

  // Chart configuration with custom colors
  const chartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Comments",
        data: [stats.positive, stats.negative, stats.neutral],
        backgroundColor: ["#34D399", "#F87171", "#93A5C4"], // Emerald, Red, Light Blue/Gray
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(255, 255, 255, 0.15)" } },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.h1
          className="text-5xl font-extrabold text-center pb-10 tracking-wider bg-gradient-to-r from-teal-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Analytics
        </motion.h1>

        {/* Graph Section */}
        <motion.div
          className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-gray-600"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-center mb-6 text-slate-400 drop-shadow-md">
            Sentiment Analysis
          </h2>
          <Bar data={chartData} options={chartOptions} />
        </motion.div>

        {/* Reviews List */}
        <div className="mt-12 space-y-8">
          {reviews.length === 0 ? (
            <motion.p
              className="text-center text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
             
            </motion.p>
          ) : (
            reviews.map((review) => (
              <motion.div
                key={review.id}
                className="p-6 rounded-xl shadow-xl bg-gray-800 bg-opacity-80 backdrop-blur-md border border-gray-600 transition-transform duration-300 hover:scale-105 hover:border-teal-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="mb-4 text-lg text-gray-200">{review.message}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">
                    {new Date(review.createdAt).toLocaleString()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full font-bold ${
                      review.sentiment === "positive"
                        ? "bg-green-400 text-gray-900"
                        : review.sentiment === "negative"
                        ? "bg-red-400 text-gray-900"
                        : "bg-blue-400 text-gray-900"
                    }`}
                  >
                    {review.sentiment.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
