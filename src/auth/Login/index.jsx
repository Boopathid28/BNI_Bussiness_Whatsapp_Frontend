import React, { useState } from 'react'
import Logo from "../../assets/images/bni_logo.png"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postAxios } from '../../service/axios_service';
import { loginEndPoint } from '../../service/api_endpoints';


export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
        password: Yup.string()
        .min(5, 'Must be 5 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      let response = await postAxios({
        url: loginEndPoint,
        body: values
      })

      if (response != null) {
        localStorage.setItem('is_authenticated', true)
        localStorage.setItem('login', JSON.stringify(response.data))
        window.location.reload()
      }
    },
  });


  return (
    <div className='w-screen h-screen bg-login-bg bg-no-repeat bg-cover flex items-center justify-center'>
      <div className='bg-white w-[300px] sm:w-[450px] p-[20px] rounded-[10px]'>
        <div className='w-[75px] h-[75px] mx-auto'>
          <img src={Logo} width={"100%"} />
        </div>
        <p className='font-semibold text-xl text-center'>Sign in to account</p>
        <p className='text-sm sm:text-md text-center text-light-gray'>Enter your email & password to login</p>

        <form className='mt-[30px]' onSubmit={formik.handleSubmit}>
          <div className='my-[10px]'>
            <p>Username</p>
            <input type='text' name='username' id='username' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.username} />
            {formik.errors.username && <p className='text-red-500 text-xs'>{formik.errors.username}</p> }
          </div>
          <div className='my-[10px]'>
            <p>Password</p>
            <input type={showPassword ? 'text' : 'password'} name='password' id='password' className='text-sm bg-input-gray rounded focus:outline-primary w-full px-[15px] py-[10px]' onChange={formik.handleChange} value={formik.values.password} />
            {formik.errors.password && <p className='text-red-500 text-xs'>{formik.errors.password}</p> }
          </div>

          <div className='flex justify-end items-center gap-3 my-[35px]'>
            {/* <div className='flex gap-4'>
              <input type='checkbox' name='keeplogin' id='keeplogin' className='' />
              <p className='text-sm'>Keep Me Loggedin</p>
            </div> */}

            <button className='text-primary text-sm underline'>Forgot Password</button>
          </div>

          <button type='submit' className='w-full bg-primary px-[15px] py-[10px] text-white rounded'>Sign In</button>
        </form>
      </div>
    </div>
  )
}
