import { useEffect, useState } from "react";
import { backendUrl } from "../config";
import axios from "axios";
import { Navbar } from "./Navbar";
import { Blogs } from "./helper/Blogs";
import { Loader } from "./helper/Loader";
import { Footer } from "./Footer";

export const BlogPage = () => {
  const [blogArr, setBlogArr] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/blog/bulk`);
      setBlogArr(response.data.allPosts);
    } catch (error) {
      setError("Failed to fetch blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <Navbar />
      <div className="mt-20">
        <div className="container mx-auto max-w-6xl p-4">
          <div className="md:columns-2 lg:columns-3 gap-6 p-4 sm:p-1">
            <Blogs allBlogs={blogArr} />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
