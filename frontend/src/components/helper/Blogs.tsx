import { Link } from "react-router-dom";
import { UserDetails } from "./UserDetails";
interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

interface BlogsProps {
  allBlogs: BlogPost[];
}

export const Blogs = ({ allBlogs }: BlogsProps) => {
  const randomNumber = () => {
    return Math.floor(Math.random() * 80) + 1;
  };
  return (
    <div>
      {allBlogs.map((blog, id) => (
        <div key={id}>
          <div className="flex flex-col overflow-hidden rounded-lg shadow-lg mb-6 hover:scale-105 duration-300">
            <Link to={`/blog/${blog.id}`}>
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={`https://picsum.photos/id/${randomNumber()}/1280/720`}
                  alt=""
                  
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <div className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900 font-serif">
                      {blog.title.length > 50
                        ? `${blog.title.substring(0, 50)}...`
                        : blog.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500 font-serif">
                      {blog.content.length > 250
                        ? `${blog.content.substring(
                            0,
                            Math.floor(Math.random() * 190) + 50
                          )}...`
                        : blog.content}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <UserDetails authorId={blog.authorId} content={blog.content} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
