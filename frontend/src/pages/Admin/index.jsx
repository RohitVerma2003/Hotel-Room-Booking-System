import React, { useState } from 'react'
import useAdminLogin from '../../Hooks/useAdminLogin'
import BookingCard from '../../components/BookingCard'
import useDeleteBooking from '../../Hooks/useDeleteBooking'
import AdminHeader from '../../components/AdminHeader'

const Admin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState([])
  console.log(data)

  const { loading, login } = useAdminLogin()
  const { deleteLoading, bookRoomDelete } = useDeleteBooking()

  const handleSubmit = async () => {
    const res = await login(username, password)
    setData(res.rooms)
  }

  const handleDeleteBooking = async id => {
    const res = await bookRoomDelete(id)
    setData(res.rooms)
  }
  return (
    <>
      <AdminHeader />
      <div className='w-3/4 mx-auto my-3'>
        <div className='md:flex justify-between items-center border-b py-3'>
          <div className='md:flex justify-center items-center'>
            <div>
              <input
                type='text'
                name='username'
                id='username'
                placeholder='Username'
                value={username}
                onInput={e => setUsername(e.target.value)}
                className='border p-2 m-1 rounded-sm w-full md:w-auto'
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                value={password}
                onInput={e => setPassword(e.target.value)}
                className='border p-2 m-1 rounded-sm w-full md:w-auto'
              />
            </div>
          </div>
          <button
            type='submit'
            onClick={handleSubmit}
            className='p-2 m-1 bg-sky-600 text-white uppercase rounded-sm cursor-pointer w-full md:w-auto'
          >
            Submit
          </button>
        </div>
        <div>
          <BookingCard data={data} handleDeleteBooking={handleDeleteBooking} />
        </div>
      </div>
    </>
  )
}

export default Admin
