import { LogOut } from "./helper/LogOut";
import { SigninLeft } from "./helper/SigninLeft";
import { SigninRight } from "./helper/SigninRight";

export function Signin() {
  const token=localStorage.getItem("token");
  return (
    <div>
      {
        !token?
        <div className="h-screen flex items-center justify-center">
        <div className="ml-4 md:w-1/2">
            <SigninLeft />
        </div>
        <div className="w-1/2 hidden md:block">
          <SigninRight/>
        </div>
      </div>
        :
        <LogOut/>
      }
    </div>
    
  );
}

