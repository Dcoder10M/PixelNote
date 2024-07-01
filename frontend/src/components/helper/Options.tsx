import { useEffect, useState } from "react";
import { backendUrl } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

export const Options = ({
  token,
  id,
}: {
  token: string | null;
  id: string | undefined;
}) => {
  const [owner, setOwner] = useState(false);
  async function trueUser() {
    try {
      const response = await axios.post(
        `${backendUrl}/blog/owner`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setOwner(true);
      } else {
        setOwner(false);
      }
    } catch (e) {
      setOwner(false);
    }
  }
  if (!token) {
    return <></>;
  }
  useEffect(() => {
    trueUser();
  }, []);

  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const handleDelete = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
            // console.log("here");
            setLoading(true);
            try{
                const deleteResponse=await axios.delete(`${backendUrl}/blog/${id}`,{
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if(deleteResponse.status==200){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your blog has been deleted.",
                        icon: "success"
                      });
                      navigate("/blogs")
                }else{
                    Swal.fire({
                        title: "Unable to Delete!",
                        text: "Something went wrong.",
                        icon: "error"
                        });
                }
            }catch(e){
                Swal.fire({
                title: "Unable to Delete!",
                text: "Something went wrong.",
                icon: "error"
                });
            }finally{
              setLoading(false);
            }
          
        }
      });
  }

  const handleUpdate=()=>{
    navigate(`/update/${id}`)
  }

  return (
    <>
    {loading?
    <Loader/>
    :
    <>
    {owner ? (
      <div className="flex justify-center items-center mt-8">
        <div className=" mx-4 cursor-pointer text-slate-600" onClick={handleUpdate}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>
        <div className="mx-4 cursor-pointer text-slate-600" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
    ) : (
      <></>
    )}
    </>
    }
      
    </>
  );
};
