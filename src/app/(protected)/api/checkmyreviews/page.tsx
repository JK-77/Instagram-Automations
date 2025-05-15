"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { FiThumbsUp, FiThumbsDown, FiMeh, FiActivity, FiTrendingUp, FiCalendar } from "react-icons/fi";

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
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "positive" | "negative" | "neutral">("all");

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const filteredReviews = activeFilter === "all" 
    ? reviews 
    : reviews.filter(review => review.sentiment === activeFilter);

  // Chart configuration with custom colors
  const chartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Comments",
        data: [stats.positive, stats.negative, stats.neutral],
        backgroundColor: ["#34D399", "#F87171", "#93A5C4"], // Emerald, Red, Light Blue/Gray
        borderRadius: 8,
        borderWidth: 1,
        borderColor: ["#10B981", "#EF4444", "#64748B"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { 
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#E5E7EB',
        bodyColor: '#D1D5DB',
        borderColor: '#4B5563',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: {
          color: '#9CA3AF',
          font: {
            weight: 'bold',
          }
        }
      },
      y: { 
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: {
          color: '#9CA3AF',
          stepSize: 1
        }
      },
    },
  };

  // Sentiment percentage calculations
  const totalReviews = stats.positive + stats.negative + stats.neutral;
  const positivePercentage = totalReviews > 0 ? Math.round((stats.positive / totalReviews) * 100) : 0;
  const negativePercentage = totalReviews > 0 ? Math.round((stats.negative / totalReviews) * 100) : 0;
  const neutralPercentage = totalReviews > 0 ? Math.round((stats.neutral / totalReviews) * 100) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center pb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">
            Sentiment Dashboard
          </h1>
          <p className="mt-3 text-gray-400 max-w-lg mx-auto">
            Analyze your customer feedback with real-time sentiment tracking and visual analytics.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Positive Card */}
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl p-6 border border-green-700/50 backdrop-blur-sm shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-300 text-sm font-medium">Positive</h3>
                <p className="text-3xl font-bold text-green-400 mt-2">{stats.positive}</p>
                <p className="text-green-300 text-sm mt-1">{positivePercentage}% of total</p>
              </div>
              <div className="bg-green-600/20 p-4 rounded-full">
                <FiThumbsUp className="text-green-400 text-2xl" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-green-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-400 rounded-full" 
                style={{ width: `${positivePercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Negative Card */}
          <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 rounded-xl p-6 border border-red-700/50 backdrop-blur-sm shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-300 text-sm font-medium">Negative</h3>
                <p className="text-3xl font-bold text-red-400 mt-2">{stats.negative}</p>
                <p className="text-red-300 text-sm mt-1">{negativePercentage}% of total</p>
              </div>
              <div className="bg-red-600/20 p-4 rounded-full">
                <FiThumbsDown className="text-red-400 text-2xl" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-red-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-400 rounded-full" 
                style={{ width: `${negativePercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Neutral Card */}
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl p-6 border border-blue-700/50 backdrop-blur-sm shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-300 text-sm font-medium">Neutral</h3>
                <p className="text-3xl font-bold text-blue-400 mt-2">{stats.neutral}</p>
                <p className="text-blue-300 text-sm mt-1">{neutralPercentage}% of total</p>
              </div>
              <div className="bg-blue-600/20 p-4 rounded-full">
                <FiMeh className="text-blue-400 text-2xl" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-blue-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-400 rounded-full" 
                style={{ width: `${neutralPercentage}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Additional Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-600/20 p-3 rounded-full">
                <FiActivity className="text-purple-400 text-xl" />
              </div>
              <div>
                <h3 className="text-gray-300 text-sm font-medium">Total Reviews</h3>
                <p className="text-2xl font-bold text-white">{totalReviews}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-teal-600/20 p-3 rounded-full">
                <FiTrendingUp className="text-teal-400 text-xl" />
              </div>
              <div>
                <h3 className="text-gray-300 text-sm font-medium">Positivity Rate</h3>
                <p className="text-2xl font-bold text-white">{positivePercentage}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-600/20 p-3 rounded-full">
                <FiCalendar className="text-amber-400 text-xl" />
              </div>
              <div>
                <h3 className="text-gray-300 text-sm font-medium">Last Updated</h3>
                <p className="text-lg font-medium text-white">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Graph Section */}
        <motion.div
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-200 drop-shadow-md">
              Sentiment Distribution
            </h2>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button 
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === "all" ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter("positive")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === "positive" ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Positive
              </button>
              <button 
                onClick={() => setActiveFilter("negative")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === "negative" ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Negative
              </button>
              <button 
                onClick={() => setActiveFilter("neutral")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === "neutral" ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Neutral
              </button>
            </div>
          </div>
          
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
          
          {/* Real-time sentiment meter */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Sentiment Meter</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-red-500" 
                  style={{ 
                    width: '100%',
                    background: `linear-gradient(90deg, 
                      #34D399 ${positivePercentage}%, 
                      #93A5C4 ${positivePercentage}% ${positivePercentage + neutralPercentage}%, 
                      #F87171 ${positivePercentage + neutralPercentage}%)`
                  }}
                ></div>
              </div>
              <div className="text-sm text-gray-400">
                {positivePercentage}% Positive • {neutralPercentage}% Neutral • {negativePercentage}% Negative
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews List */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-200 drop-shadow-md">
              Customer Reviews
            </h2>
            <p className="text-gray-400">
              Showing {filteredReviews.length} of {reviews.length} reviews
            </p>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between mt-4">
                    <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-700 rounded-full w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredReviews.length === 0 ? (
            <motion.div
              className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FiMeh className="mx-auto text-4xl text-gray-500 mb-4" />
              <h3 className="text-xl text-gray-300 mb-2">No reviews found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {activeFilter === "all" 
                  ? "You don't have any reviews yet." 
                  : `You don't have any ${activeFilter} reviews.`}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="p-6 rounded-xl shadow-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 transition-all duration-300 hover:border-teal-300 hover:shadow-teal-500/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="mb-4 text-gray-200 text-lg leading-relaxed">{review.message}</p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <span className="text-gray-400 text-sm flex items-center">
                      <FiCalendar className="mr-2" />
                      {new Date(review.createdAt).toLocaleString()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full font-bold flex items-center text-sm ${
                        review.sentiment === "positive"
                          ? "bg-green-400/20 text-green-400 border border-green-400/30"
                          : review.sentiment === "negative"
                          ? "bg-red-400/20 text-red-400 border border-red-400/30"
                          : "bg-blue-400/20 text-blue-400 border border-blue-400/30"
                      }`}
                    >
                      {review.sentiment === "positive" && <FiThumbsUp className="mr-2" />}
                      {review.sentiment === "negative" && <FiThumbsDown className="mr-2" />}
                      {review.sentiment === "neutral" && <FiMeh className="mr-2" />}
                      {review.sentiment.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}