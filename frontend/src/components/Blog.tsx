import { Link, useNavigate, useParams } from "react-router-dom"
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";
import { backendUrl } from "../config";
import axios from "axios";
import { Loader } from "./helper/Loader";
import { Footer } from "./Footer";
import { UserBlogDetails } from "./helper/UserBlogDetails";
import Swal from "sweetalert2";
import { Options } from "./helper/Options";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export const Blog = () => {
  const [blogData, setBlogData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const params = useParams<{ id: string }>();
  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/blog/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogData(response.data.post);
    } catch (err) {
      setError("Failed to fetch blog data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const navigate=useNavigate();
  useEffect(() => {
    if(!token){
      Swal.fire({
        title: "Sign in to continue",
        icon: "info"
      });
      navigate("/signin");
    }else{
      fetchBlogData();
    }
  }, [params.id]);

  if (loading) return <Loader/>;
  if (error) return <div>{error}</div>;
    const randomNumber=()=>{
      return Math.floor(Math.random() * 80) + 1;
  }

  const paragraphs = blogData?.content.split('. ') ?? [];
  const firstParagraph = paragraphs[0] + (paragraphs[0].endsWith('.') ? '' : '.');

  const authorNameId=blogData?.authorId || "Anonymous";
  const readTime=(blogData?.content)?Math.ceil(((blogData?.content).length)/860): 0;
  return (
    <div>
        <Navbar/>
<main className="md:mt-12">
  <article>
    <header className="mx-auto max-w-screen-lg pt-28 text-center">
      <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl font-serif break-words">{blogData?.title}</h1>
      <div className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Tags">
        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Trending</button>
        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Insights</button>
        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Must-Read</button>
        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Editor's Pick</button>
      </div>
      <UserBlogDetails authorId={authorNameId} readTime={readTime}/>
      <Options token={token} id={params.id}/>
      <img className="sm:h-[34rem] mt-10 w-full object-contain" src={`https://picsum.photos/id/${randomNumber()}/1920/1080`} alt="Featured Image" />
    </header>

    <div className="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
      <strong className="text-2xl font-medium break-words">{firstParagraph}</strong>
      {paragraphs.slice(1).map((paragraph, index) => (
        <p key={index} className="break-words">
          {paragraph}
          {index < paragraphs.length - 1 && '.'}
        </p>
      ))}
    </div>
  </article>
</main>

<div className="w-fit mx-auto mt-10 flex space-x-2">
  <div className="h-0.5 w-2 bg-gray-600"></div>
  <div className="h-0.5 w-32 bg-gray-600"></div>
  <div className="h-0.5 w-2 bg-gray-600"></div>
</div>

<aside aria-label="Related Articles" className="mx-auto mt-10 max-w-screen-xl py-20">
  <h2 className="mb-8 text-center text-3xl sm:text-5xl font-bold text-gray-900">More Blogs</h2>

  <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
    <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
    <Link to="/blogs">
        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcnRuZXJzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="h-56 w-full object-cover" alt="" />
        <div className="flex-auto px-6 py-5">
          <span className="mb-2 flex items-center text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            Branding</span
          >
          <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">How to perform NPS Surveys</h3>
          <p className="mb-4 text-base font-light">Net Promoter Score (NPS) surveys are a powerful tool for gauging customer loyalty and satisfaction...</p>
          <span className="inline-block cursor-pointer select-none  w-full rounded-md mt-3 p-3 border border-balck bg-black px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm ">Read Now</span>
        </div>
      </Link>
    </article>

    <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
      <Link to="/blogs">
        <img src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXdhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="h-56 w-full object-cover" alt="" />
        <div className="flex-auto px-6 py-5">
          <span className="mb-2 flex items-center text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            Public Relations</span
          >
          <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">Understanding Public Relations</h3>
          <p className="mb-4 text-base font-light">Public relations (PR) is an essential aspect of any successful business or organization...</p>
          <span className="inline-block cursor-pointer select-none  w-full rounded-md mt-3 p-3 border border-balck bg-black px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">Read Now</span>
        </div>
      </Link>
    </article>

    <article className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
    <Link to="/blogs">
        <img src="https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXdhcmRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="h-56 w-full object-cover" alt="" />
        <div className="flex-auto px-6 py-5">
          <span className="mb-2 flex items-center text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            Marketing</span
          >
          <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">Unlocking Untapped Skills in Marketing</h3>
          <p className="mb-4 text-base font-light">In today's competitive business landscape, the ability to uncover and harness untapped skills...</p>
          <span className="inline-block cursor-pointer select-none  w-full rounded-md mt-3 p-3 border border-balck bg-black px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">Read Now</span>
        </div>
      </Link>
    </article>
  </div>
</aside>
      <Footer></Footer>
    </div>
  )
}
