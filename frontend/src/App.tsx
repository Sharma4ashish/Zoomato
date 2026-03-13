import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoutes'
import PublicRoute from './components/PublicRoutes'
import SelectRole from './pages/SelectRole'


function App() {

  return (
    <BrowserRouter>
      <Routes>  
        < Route element={<PublicRoute/>}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/select-role' element={<SelectRole/>} />
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
