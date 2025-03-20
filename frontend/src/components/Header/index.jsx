import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setRooms, setUser } from '../../redux/dataSlice'

const Header = () => {
  const { user } = useSelector(state => state.dataSlice)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      toast.success('Logged out successfully')
      dispatch(setUser(null))
      dispatch(setRooms(null))
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full p-3 flex justify-between items-center shadow-sm'>
      <div className='uppercase md:text-4xl text-teal-500 font-extrabold'>
        rohit's hotel
      </div>
      <div>
        {user ? (
          <div className='flex gap-2 justify-center items-center'>
            <div>{user.fullName}</div>
            <button
              className='border rounded-md p-1 text-sm cursor-pointer'
              onClick={handleLogout}
            >
              Log Out
            </button>
            <Link to={'/admin'}>
              <button className='border rounded-md p-1 text-sm cursor-pointer'>
                Admin
              </button>
            </Link>
          </div>
        ) : (
          <div className='flex gap-2 justify-center items-center'>
            <Link to={'/login'}>
              <button className='border rounded-md p-1 text-sm cursor-pointer'>
                Login
              </button>
            </Link>
            <Link to={'/signup'}>
              <button className='border rounded-md p-1 text-sm cursor-pointer'>
                SignUp
              </button>
            </Link>
            <Link to={'/admin'}>
              <button className='border rounded-md p-1 text-sm cursor-pointer'>
                Admin
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
