import React from 'react'

const BookingCard = ({ data, handleDeleteBooking }) => {
  return (
    <div>
      {data.map(ele => (
        <div key={ele._id} className='w-full p-3 border rounded-md my-2'>
          <div className='flex justify-between items-center'>
            <div className='md:text-2xl font-bold'>
              {ele?.bookedBy?.fullName} <span>({ele?.bookedBy?.username})</span>
            </div>
            <div className='md:text-2xl font-bold'>{ele?.price}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-sm'>Date : {ele?.date}</div>
            <div className='text-sm'>Room Number : {ele?.roomNumber}</div>
          </div>
          <button
            className='w-full uppercase bg-red-600 text-white p-2 rounded-md mt-3 cursor-pointer'
            onClick={() => handleDeleteBooking(ele?._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default BookingCard
