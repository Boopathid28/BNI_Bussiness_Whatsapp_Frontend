import React, { useEffect, useState } from 'react'
import Profile from "../../assets/images/profile.svg"
import Logo from "../../assets/images/bni_logo.png"
import Breadcrumbs from './breadcrumbs'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsMenuOpen, setIsWhatsappLoggedIn } from '../../redux/layout_slice'
import { getAxiosWithToken } from '../../service/axios_service'
import { groupListEndPoint, profileInfoEndPoint } from '../../service/api_endpoints'
import { setGroupList } from '../../redux/groups_slice'

export default function Header() {

  const { isMenuOpen, isWhatsappLoggedIn } = useSelector((state) => state.layoutSlice);

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [userProfileIcon, setUserProfileIcon] = useState("")
  const [userProfileFullIcon, setUserProfileFullIcon] = useState("")
  const [userProfileName, setUserProfileName] = useState("")
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    getUserProfile();
    getGroupsList();
  }, [pathname])

  const getUserProfile = async () => {
    let response = await getAxiosWithToken({
      url: profileInfoEndPoint
    })

    setProfileLoading(false);
    if (response != null) {
      if (response.message.toLowerCase() == "Data retrieved sucessfully".toLowerCase()) {
        dispatch(setIsWhatsappLoggedIn(true))
        setUserProfileIcon(response.data.icon)
        setUserProfileName(response.data.name)
      } else {
        dispatch(setIsWhatsappLoggedIn(false))
      }
    } else {
      dispatch(setIsWhatsappLoggedIn(false))
    }
  }

  const getGroupsList = async () => {
    let response = await getAxiosWithToken({
      url: groupListEndPoint
    })

    if (response != null) {
      dispatch(setGroupList(response?.data?.list))
    }
  }

  return (
    <div className='shadow px-[10px] md:px-[25px] py-[10px] md:py-[15px] h-[70px] bg-header-bg flex items-center justify-between gap-5'>
      <div className='flex gap-2'>
        <div onClick={() => {
          dispatch(setIsMenuOpen(!isMenuOpen))
        }} className='sm:hidden'>
          <span className='i-lucide-menu w-7 h-7'></span>
        </div>
        <div className=''>
          <p className='text-sm md:text-xl font-medium mb-2 uppercase'>{pathname == "/" ? 'dashboard' : pathname.split('/')[pathname.split('/').length - 1]}</p>
          {pathname != "/" && <Breadcrumbs />}
        </div>
      </div>
      <div className='flex items-center gap-2 md:gap-7'>
        {/* <div className='w-8 h-8 flex items-center justify-center rounded-md bg-[#CBECEA] '>
          <span className='i-iconoir-send-mail w-6 h-6 text-primary'></span>
        </div>
        <div className='w-8 h-8 flex items-center justify-center rounded-md bg-[#CBECEA] '>
          <span className='i-teenyicons-moon-outline w-6 h-6 text-primary'></span>
        </div> */}
        {!profileLoading && <div className='flex gap-3 items-center'>

          <div className='w-[45px] h-[45px] rounded-full overflow-hidden'>
            <img src={userProfileIcon} width={"100%"} />
          </div>
          <div className='hidden sm:block'>
            <p className='text-sm '>{userProfileName}</p>
            <p className='text-sm text-light-gray'>{isWhatsappLoggedIn ? 'Logged In' : "Logged Out"}</p>
          </div>
        </div>}
      </div>
    </div>
  )
}
