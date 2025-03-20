import React from 'react'
import { useSelector } from 'react-redux'
import useBookRoom from '../../Hooks/useBookRoom'

const Rooms = () => {
  const { rooms } = useSelector(state => state.dataSlice)
  const { bookRoom, loading } = useBookRoom()

  const handleSubmit = async () => {
    await bookRoom(rooms.date, rooms.roomPrice)
  }
  return (
    <>
      {rooms ? (
        <div className='w-full md:w-1/4 border rounded-xl'>
          <div className=''>
            <div>
              <img src='/hotel-room.jpg' alt='...' className='rounded-t-xl' />
            </div>
            <div className='p-3'>
              <div className='font-medium'>
                Rooms Available : {rooms.roomsAvailable}
              </div>
              <div className='font-medium'>Rooms Price : {rooms.roomPrice}</div>
              <div className='font-medium'>Date : {rooms.date}</div>
              <button
                onClick={handleSubmit}
                className='mt-5 w-full bg-black text-white rounded-md text-sm p-2 cursor-pointer'
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full text-3xl text-gray-500 text-center'>
          Choose The Date You Want To Book On
        </div>
      )}
    </>
  )
}

export default Rooms
