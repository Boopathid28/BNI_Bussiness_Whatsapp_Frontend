import React, { useEffect, useState } from 'react'
import Logo from "../../assets/images/bni_logo.png"
import { NavLink } from 'react-router-dom';
import { menuList } from '../../app/menu_constant';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMenuOpen } from '../../redux/layout_slice';
import { getAxiosWithToken } from '../../service/axios_service';
import { logoutEndPoint } from '../../service/api_endpoints';

export default function Sidebar() {

  const { isMenuOpen } = useSelector((state) => state.layoutSlice);

  const dispatch = useDispatch();

  const logout = async () => {
    let response = await getAxiosWithToken({
      url: logoutEndPoint
    })

    if (response != null) {
      localStorage.removeItem('is_authenticated');
      localStorage.removeItem('login');
      window.location.reload()
    }
  }

  return (
    <div className='flex flex-col justify-between h-screen'>
      <div onClick={() => {
        dispatch(setIsMenuOpen(!isMenuOpen))
      }} className='absolute right-0 sm:hidden'>
        <span className='i-line-md-close w-5 h=5'></span>
      </div>
      <div>
        <div className='flex border-b items-center gap-3 px-[25px] py-[15px]'>
          <div className='w-[75px]'>
            <img src={Logo} width={"100%"} />
          </div>
          <div>
            <p className='text-md font-semibold text-primary'>Whatsapp</p>
            <p className='text-sm font-semibold text-primary'>Automation Tool</p>
          </div>
        </div>

        <div className='mt-[20px]'>
          {
            menuList.map((menu, index) => (
              <NavLink to={menu.path} className={({ isActive }) =>
                isActive ? 'text-primary' : undefined
              }>
                <div className={`py-[10px] text-lg  px-[25px] flex gap-3 items-center`}>
                  <span className={`${menu.icon} w-5 h-5`}></span>
                  <p className='text-sm'>{menu.menu_name}</p>
                </div>
              </NavLink>
            ))
          }
        </div>
      </div>

      <div onClick={() => { logout() }} className='py-[10px] text-lg  px-[25px] flex gap-3 items-center mb-6'>
        <span className={`i-solar-logout-3-linear w-5 h-5`}></span>
        <p className='text-sm'>Logout</p>
      </div>
    </div>
  )
}
