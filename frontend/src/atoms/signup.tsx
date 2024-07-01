import { atom } from "recoil";
import { SignupType } from "@dcoder10m/medium_common";

export const signupAtom=atom<SignupType>({
    key:'signupAtom',
    default:{
        name:"",
        email:"",
        password:"",
    }
})