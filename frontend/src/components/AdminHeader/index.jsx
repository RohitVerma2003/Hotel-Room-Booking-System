import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <div className='w-full p-3 flex justify-between items-center shadow-sm'>
      <div className='uppercase md:text-4xl text-teal-500 font-extrabold'>
        rohit's hotel
      </div>
      <div>
        <Link to={'/'}>
          <button className='border rounded-md p-1 text-sm cursor-pointer'>
            Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default AdminHeader
