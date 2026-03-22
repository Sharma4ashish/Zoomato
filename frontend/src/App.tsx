import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoutes'
import PublicRoute from './components/PublicRoutes'
import SelectRole from './pages/SelectRole'
import Navbar from './components/Navbar'
import Account from './pages/Account'
import { useAppData } from './context/AppContext'
import Restaurant from './pages/Restaurant'


function App() {

    const { user, loading } = useAppData();


  if (user && user?.role === "seller") {
    return (<Restaurant/>)
  }

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>  
        < Route element={<PublicRoute/>}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<Home />} />

          <Route path='/select-role' element={<SelectRole/>} />
          <Route path='/account' element={<Account/>} />
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
