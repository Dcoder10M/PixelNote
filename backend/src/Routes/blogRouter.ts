import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createPostInput, updatePostInput } from "@dcoder10m/medium_common";
import { auth } from "../middleware";

const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
    },
    Variables:{
        userId:string
    }
}>();

blogRouter.post('/',auth,async (c)=>{
    try{
        const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        
        const body=await c.req.json();
        const {success}=await createPostInput.safeParse(body);
        if(!success){
            return c.json({
                msg:"invalid inputs"
            },411)
        }
        const authorId=c.get("userId");
        
        const createdBlog=await prisma.post.create({
            data:{
                title:body.title,
                content: body.content,
                authorId: authorId
            }
        })
        
        return c.json({
            createdBlog
        },200)
    }catch(e){
        return c.json({ error:"error"},411);
    }
})
blogRouter.post('/owner',auth,async (c)=>{
    try{
        const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        
        const body=await c.req.json();
        const authorId=c.get("userId");
        
        const alreadyCreatedBlog=await prisma.post.findFirst({
            where:{
                id:body.id,
                authorId: authorId
            }
        })
        if(alreadyCreatedBlog){
            return c.json({
                alreadyCreatedBlog
            },200)
        }else{
            return c.json({ error:"error"},411);
        }
    }catch(e){
        return c.json({ error:"error"},411);
    }
})




blogRouter.put('/',auth,async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        
        const authorId=c.get("userId");
        const body = await c.req.json();
        const {success} = await updatePostInput.safeParse(body);
        if(!success){
            return c.json({
                msg:"invalid inputs"
            },411)
        }
        const updatedBlog=await prisma.post.update({
            where:{
                id:body.id,
                authorId:authorId
            },
            data:{
                title: body.title,
			    content: body.content
            }
        })
        return c.json({
            updatedBlog:updatedBlog
        },200)
    }catch(e){
        return c.json({
            msg:"error"
        },411);
    }
})

blogRouter.get('/bulk',async (c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        
        const allPosts = await prisma.post.findMany();
        return c.json({
            allPosts
        },200)
    }catch(e){
        return c.json({
            error:"error"
        },411)
    }
})

blogRouter.get('/:id',auth,async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        
        const id=c.req.param("id");
        const post=await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        
        return c.json({
            post
        },200)
    }catch(e){
        return c.json({error:"error"},411);
    }
})

blogRouter.delete('/:id',auth,async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        const authorId=c.get("userId");
        const id=c.req.param("id");
        // console.log(id,authorId);
        const ress=await prisma.post.delete({
            where: {
                id: id,
                authorId: authorId
            }
        })
        
        return c.json({
            Success: true
        },200)
    }catch(e){
        return c.json({error:"error"},411);
    }
})

blogRouter.put('/',auth,async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        const authorId=c.get("userId");
        const body=await c.req.json();
        const updatedBlog=await prisma.post.update({
            where: {
                id: body.id,
                authorId: authorId
            },
            data:{
                title:body.title,
                content:body.content
            }
        })
        
        return c.json({
            updatedBlog
        },200)
    }catch(e){
        return c.json({error:"error"},411);
    }
})


export default blogRouter


