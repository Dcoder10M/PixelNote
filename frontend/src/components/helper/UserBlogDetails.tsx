import axios from "axios";
import { backendUrl } from "../../config";
import { useEffect, useState } from "react";

export const UserBlogDetails = ({authorId,readTime}:{authorId:string,readTime:number}) => {
    const [authorData, setAuthorData] = useState<string>("");
    const fetchUserName = async () => {
        const userObj = await axios.post(`${backendUrl}/user`, {
          authorId: authorId,
        });
        setAuthorData(userObj.data.name || "Anonymous");
      };
      useEffect(() => {
        fetchUserName();
      }, []);
  return (
    <div className="flex items-center justify-center mt-8">
        <div className="flex items-center justify-center max-w-40">
      <ImageAvatar />
      <p className="ml-4 w-56">
        <strong className="text-base block font-bold text-gray-700">
          {authorData.length > 30
            ? `${authorData.substring(0, 30)}...`
            : authorData}
        </strong>
        <p className="text-sm text-gray-400">{readTime} min read</p>
      </p>
    </div>
    </div>
  )
}

const ImageAvatar = () => {
    const avatarNames = [
      "Snowball",
      "Simba",
      "Jasmine",
      "Baby",
      "Molly",
      "Abby",
      "Pepper",
      "Sadie",
      "Boots",
      "Fluffy",
    ];
    const randomAvatar = () => {
      return Math.floor(Math.random() * 10);
    };
    return (
      <img
        className="bg-slate-300 scale-125 h-10 w-10 rounded-full object-cover"
        src={`https://api.dicebear.com/9.x/micah/svg?seed=${
          avatarNames[randomAvatar()]
        }`}
        alt="Simon Lewis"
      />
    );
  };
