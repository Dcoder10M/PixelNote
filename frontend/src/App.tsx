import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './components/Signup.tsx'
import { Signin } from './components/Signin.tsx'
import { Blog } from './components/Blog.tsx'
import { BlogPage } from './components/BlogPage.tsx'
import { Landing } from './components/Landing.tsx'
import { NotFound } from './components/404.tsx'
import { CreateBlog } from './components/CreateBlog.tsx'
import { UpdateBlog } from './components/UpdateBlog.tsx'

function App() {
  return (
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App