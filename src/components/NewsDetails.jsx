import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const NewsDetails = () => {
  const { article_id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://news-pules-server.vercel.app/api/news/${article_id}`,
      );
      console.log(response);
      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  console.log(details);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="p-6 max-w-4xl mx-auto">
        <Link to={"/"} className="cursor-pointer">
          <button className="mb-4 text-blue-600 hover:underline flex items-center cursor-pointer">
            ← Back to Feed
          </button>
        </Link>
        <img
          src={
            details.image_url ||
            "https://via.placeholder.com/800x400?text=No+Image"
          }
          className="w-full h-96 object-cover rounded-xl mb-6"
          alt={details.title}
        />
        <h1 className="text-4xl font-bold mb-4">{details.title}</h1>
        <div className="flex gap-4 mb-6 text-gray-600">
          <span>By {details.creator || "Unknown"}</span>
          <span>{new Date(details.pubDate).toLocaleDateString()}</span>
        </div>
        <p className="text-lg leading-relaxed text-gray-800">
          {details.content || details.description}
        </p>
        <a
          href={details.link}
          target="_blank"
          rel="noreferrer"
          className="block mt-6 text-blue-500 font-semibold">
          Read Original Article →
        </a>
      </div>
    </div>
  );
};

export default NewsDetails;
