import { atom } from "recoil";
import { SigninType } from "@dcoder10m/medium_common";

export const signinAtom=atom<SigninType>({
    key:'signinAtom',
    default:{
        email:"",
        password:"",
    }
})