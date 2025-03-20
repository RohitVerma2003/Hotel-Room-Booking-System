import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Admin from './pages/Admin'

function App () {
  const { user } = useSelector(state => state.dataSlice)
  
  return (
    <>
      <Toaster />
      <Routes>
        <Route exact path='/' element={user != null ? <Home/> : <Navigate to={'/login'}/>}/>
        <Route exact path='/login' element={user != null ? <Navigate to={'/'}/> : <Login/>} />
        <Route exact path='/signup' element={user != null ? <Navigate to={'/'}/> : <SignUp/>} />
        <Route exact path='/admin' element={<Admin/>} />
      </Routes>
    </>
  )
}

export default App
