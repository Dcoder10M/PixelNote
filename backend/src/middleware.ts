import { verify } from "hono/jwt";
import { Context } from "hono"

export const auth = async(c:Context,next:()=>Promise<void>)=>{
    const auth=c.req.header("Authorization");
    const token=auth?.split(' ')[1];
    if( !auth || !auth.startsWith("Bearer ") || !token ){
        return c.json({
            error:"Unauthorized"
        },411)
    }
    try{
        const decodedUser=await verify(token,c.env.JWT_SECRET)
        if(!decodedUser.id){
            return c.json({
                error:"Unauthorized"
            },411)
        }
        c.set("userId",decodedUser.id);
        c.set("authorName",decodedUser.name);
        await next();
    }catch(e){
        return c.json({
            error:"Unauthorized"
        },411)
    }
}