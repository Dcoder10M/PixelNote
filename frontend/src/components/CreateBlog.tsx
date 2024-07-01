import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { backendUrl } from "../config";
import axios from "axios";
import { Loader } from "./helper/Loader";

export const CreateBlog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "user not logged in",
      });
      navigate("/signin");
    }
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreateBlog = async () => {
    // console.log(title, description);
    if (!title || !description) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/blog`,
        {
          title: title,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Handle the response
      if (response.status === 200) {
        // console.log(response.data.createdBlog.id);
        Swal.fire({
          icon: "success",
          title: "Blog Created",
          text: "Your blog has been created successfully!",
        });

        navigate(`/blog/${response.data.createdBlog.id}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }

    // Handle blog creation logic here

    // Redirect to the blogs page or the created blog's page
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-4xl mx-auto mt-8 p-4  rounded shadow-md  flex flex-col  justify-center">
          <h2 className="text-3xl font-semibold font-serif mb-8">
            Create a New Blog
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700  font-bold mb-2 font-serif text-xl"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-serif text-xl"
              placeholder="Story Title..."
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2 text-lg font-serif"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg font-serif text-lg"
              placeholder="Share Your Story..."
              rows={10}
            ></textarea>
          </div>
          {/* <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2 font-serif" htmlFor="content">
        Content
      </label>
      <ReactQuill
        value={content}
        onChange={setContent}
        className="h-64 font-serif"
        placeholder="Tell us your story..."
      />
    </div> */}
          <button
            onClick={handleCreateBlog}
            className="font-serif group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-neutral-950 px-8 py-2 text-neutral-50"
          >
            <span className="relative z-10">Create Blog</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </button>
        </div>
      )}
    </>
  );
};
