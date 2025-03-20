import React, { useState } from 'react'
import useLogin from '../../Hooks/useLogin'
import Header from '../../components/Header'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { loading, login } = useLogin()

  const handleSubmit = async e => {
    await login(username, password)
  }
  return (
    <>
      <Header />
      <div className='w-full h-[100vh] flex justify-center items-center'>
        <div className='md:w-1/3 w-3/4 border rounded-sm p-5'>
          <div className='text-3xl mb-3 mx-1 text-center'>Login</div>
          <div>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              value={username}
              onInput={e => setUsername(e.target.value)}
              className='border p-2 m-1 w-full rounded-sm'
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
              className='border p-2 m-1 w-full rounded-sm'
            />
          </div>
          <button
            type='submit'
            onClick={handleSubmit}
            className='p-2 w-full m-1 mt-2 bg-sky-600 text-white uppercase rounded-sm cursor-pointer'
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
