import { Hono} from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@dcoder10m/medium_common";

const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post('/',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try{
    const body = await c.req.json();
    const result=await prisma.user.findUnique({
      where: { id: body.authorId }
    })
    return c.json(result,200);
  }catch(e){
    return c.json({
        msg:"User Not Found"
    },404)
  }
})

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    try {
      const body = await c.req.json();
      const result = await signupInput.safeParse(body);
  
      if (!result.success) {
        return c.json({
          msg: "Invalid inputs",
          success: false
        }, 411);
      }
  
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: body.email }
      });
      if (existingUser) {
        return c.json({
          msg: "An account with this email already exists",
          success: false
        }, 409); // 409 Conflict
      }
  
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password
        }
      });
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ token: token, success: true }, 200);
    } catch (e) {
      // console.error(e);
      return c.json({
        msg: "Server error",
        success: false
      }, 500);
    }
  });

userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const body=await c.req.json();
        const {success} = await signinInput.safeParse(body);
        if(!success){
            return c.json({
                msg:"invalid inputs"
            },411)
        }
        const existingUser=await prisma.user.findFirst({
            where:{
                email: body.email,
                password:body.password
            }
        })
        if(!existingUser){
            return c.json({
                Success:false
            },413)
        }
        const token=await sign({id:existingUser.id},c.env.JWT_SECRET);
        return c.json({token:token},200);
    }catch(e){
        return c.json({
            Success:false
        },500)
    }
})

export default userRouter