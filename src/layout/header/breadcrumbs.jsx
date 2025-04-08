import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Breadcrumbs() {

    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className='flex gap-3 items-center text-xs md:text-sm'>
            <span onClick={() => navigate('/')} className='i-fluent-home-12-regular w-4 h-4 text-light-gray'></span>
            {
                pathname.split('/').map((item, index) => (
                    item.length > 0 && <div className='flex gap-3 items-center'>
                        <p>/</p>
                        <p className={`${(pathname.split('/').length - 1) == index ? 'text-primary' : 'text-light-gray' } capitalize`}>{item}</p>    
                    </div>
                ))
            }
        </div>
    )
}
