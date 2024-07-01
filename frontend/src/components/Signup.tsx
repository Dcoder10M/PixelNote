"use client";

import { LogOut } from "./helper/LogOut.tsx";
import { SignUpLeft } from "./helper/SignUpLeft";
import { SignUpRight } from "./helper/SignUpRight.tsx";

export function Signup() {
  const token = localStorage.getItem("token");
  return (
    <div>
      {!token ? (
        <div className="h-screen flex items-center justify-center">
          <div className="w-1/2 hidden md:block bg-slate-500">
            <SignUpRight />
          </div>
          <div className=" md:w-1/2">
            <SignUpLeft />
          </div>
        </div>
      ) : (
        <LogOut />
      )}
    </div>
  );
}
