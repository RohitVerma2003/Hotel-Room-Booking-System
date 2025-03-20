import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useCheckAvailability from '../../Hooks/useCheckAvailability'
import Rooms from '../../components/Rooms'
import Header from '../../components/Header'

const Home = () => {
  const { user } = useSelector(state => state.dataSlice)
  console.log('user', user)

  const [date, setDate] = useState('')
  console.log('date', date)

  const { checkAvailability, loading } = useCheckAvailability()

  const handleSubmit = async () => {
    await checkAvailability(date)
  }

  return (
    <>
      <Header />
      <div className='w-full flex justify-center'>
        <div className='w-3/4'>
          <div className='md:flex justify-between items-center my-5 py-3 border-b'>
            <label htmlFor='date' className='uppercase font-semibold p-2'>
              Choose Date :{' '}
            </label>
            <input
              type='date'
              name='date'
              id='date'
              value={date}
              onInput={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className='border p-2 m-1 w-full md:w-1/2 rounded-sm'
            />
            <button
              onClick={handleSubmit}
              className='p-2 w-full md:w-1/4 m-1 bg-sky-600 text-white uppercase rounded-sm cursor-pointer'
            >
              submit
            </button>
          </div>
          <Rooms />
        </div>
      </div>
    </>
  )
}

export default Home
