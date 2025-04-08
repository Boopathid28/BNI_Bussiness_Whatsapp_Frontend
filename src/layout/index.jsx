import React, { useEffect } from 'react'
import Header from './header'
import Sidebar from './sidebar'
import { ToastContainer, toast } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Layout() {

  const { isMenuOpen } = useSelector((state) => state.layoutSlice);

  return (
    <div className='flex w-full'>
      <div id='sidebar' className={`min-w-[250px] h-screen drop-shadow-lg bg-sidebar-bg z-[6] fixed top-0 ${isMenuOpen ? "sm:translate-x-0" : "translate-x-[-250px] sm:translate-x-0"}`}>
        <Sidebar />
      </div>
      <div className='w-full sm:w-[calc(100vw-250px)] sm:ml-[250px]'>
        <Header />

        <div className='p-[25px] w-full'>
          <Outlet />
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={'zoom'}
      />
    </div>
  )
}
