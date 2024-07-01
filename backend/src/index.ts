import { Hono } from 'hono'
import userRouter from './Routes/userRouter'
import blogRouter from './Routes/blogRouter';
import { cors } from 'hono/cors'


const app = new Hono<{
    Variables:{
        userId:string
    }
}>()

app.use('/*', cors())
// app.use('/api/v1/blog/:id',auth);

app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter)

export default app
