"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../utils/cn";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { signinAtom } from "../../atoms/signin";
import axios from "axios";
import { backendUrl } from "../../config";
import Swal from "sweetalert2";

export function SigninLeft() {
  const [signin, setSignin] = useRecoilState(signinAtom);
    const navigate=useNavigate();
    const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignin((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Form submitted");
    setIsLoading(true); // Start loading
    try {
      if (!signin.email) {
        Swal.fire({
          icon: "error",
          title: "Please enter your email",
        });
        setIsLoading(false); // Stop loading
        return;
      }
      if (!signin.password) {
        Swal.fire({
          icon: "error",
          title: "Please enter your password",
        });
        setIsLoading(false); // Stop loading
        return;
      }
      const response = await axios.post(
        `${backendUrl}/user/signin`,
        signin
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/blogs");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unexpected error occurred. Please try again.",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 413) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Incorrect email/password",
            });
          } else if (error.response.status === 411) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Enter valid inputs",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unexpected error occurred. Please try again.",
            });
          }
        } else {
          // console.error("No response received:", error.request);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Server error. Please try again later.",
          });
        }
      } else {
        // console.error("Error setting up request:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unexpected error occurred. Please try again.",
        });
      }
    }finally {
      setIsLoading(false); // Stop loading in finally block
    }
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Log Into Your Account
      </h2>
      <span className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Don't have an account? &nbsp;
      </span>
      {!isLoading && ( 
        <>
        <Link to="/signup">
          <span className="underline text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Sign up
          </span>
        </Link>
        <Link to="/" className="ml-2">
          <span className="underline text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Home
          </span>
        </Link>
        </>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            value={signin.email}
            onChange={handleChange}
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            disabled={isLoading} 
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            value={signin.password}
            onChange={handleChange}
            id="password"
            placeholder="••••••••"
            type="password"
            disabled={isLoading} 
          />
        </LabelInputContainer>

        <button
          className="mt-8 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isLoading} 
        >
          {isLoading ? "Signing in..." : `Sign in →`}
          <BottomGradient />
        </button>

        </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
