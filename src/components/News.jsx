import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, Calendar, Globe, User, BookOpen } from "lucide-react";
import { Link } from "react-router";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    language: "",
    country: "",
    creator: "",
    startDate: "",
    endDate: "",
  });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (filters[key]) params.append(key, filters[key]);
      });

      const response = await axios.get(
        `https://news-pules-server.vercel.app/api/news?${params.toString()}`,
      );
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <BookOpen className="text-blue-600" /> NewsPulse
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <select
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }>
            <option value="">All Categories</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="sports">Sports</option>
          </select>

          <select
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, language: e.target.value })
            }>
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="bn">Bengali</option>
          </select>

          <input
            type="text"
            placeholder="Author Name"
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, creator: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />

          <button
            onClick={fetchNews}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Apply Filters
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl font-semibold">
            Loading News...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.article_id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <img
                  src={
                    article.image_url ||
                    "https://via.placeholder.com/400x200?text=News"
                  }
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase">
                      {article.category?.[0] || "General"}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(article.pubDate).toLocaleDateString()}
                    </span>
                  </div>
                  <Link
                    to={`news-details/${article.article_id}`}
                    className="text-xl font-bold mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 duration-300">
                    {article.title}
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <User size={14} />
                    <span>{article.creator || "Unknown Source"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No news found with these filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
