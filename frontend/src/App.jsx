
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Homepage from './components/Homepage'
import Footer from './components/shared/Footer'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import Profile from './components/Profile'
import Listings from './components/Listings'
import CreatePost from './components/CreatePost'
import PostDescription from './components/PostDescription'
import AppliedPosts from './components/AppliedPosts'
import Applicants from './components/Applicants'
import Aboutus from './components/Aboutus'
import UpdatePost from './components/UpdatePost'
import ChangePassword from './components/ChangePassword'
import ContactUs from './components/ContactUs'
import Blogs from './components/Blogs'
import BlogDescription from './components/BlogDescription'

function App() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/listings' element={<Listings />} />
        <Route path='/post' element={<CreatePost />} />
        <Route path='/post/:id' element={<PostDescription />} />
        <Route path='/applied-post' element={<AppliedPosts />} />
        <Route path='/view-applicants/:id' element={<Applicants />} />
        <Route path='/about' element={<Aboutus />} />
        <Route path='/update/:id' element={<UpdatePost />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/blog' element={<Blogs />} />
        <Route path='/blog/:id' element={<BlogDescription />} />




      </Routes>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}
    </>
  )
}

export default App