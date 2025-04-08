import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MessageTemplates() {
    const navigate = useNavigate();

    return (
        <div>
            <p className='text-primary font-bold text-xl mb-10'>Message Templates</p>

            <div className='grid grid-cols-3 2xl:grid-cols-4 gap-10'>
                <div onClick={() => {navigate('/messages/renewal'); localStorage.setItem('recent_template', 'renewal')}} className='bg-white shadow border rounded-lg p-5 w-[300px] h-[350px]'>
                    <p className=''>Dear Team,</p><br />
                    <p>🔹Jul Month Renewal🔹- The Last Date to Receive 31st Jul 2024</p><br />
                    <p>Renewal Fee - 1 Year - 41,665 / <br /> 2 Year- 66,669</p>
                </div>

                <div onClick={() =>{ navigate('/messages/checklist'); localStorage.setItem('recent_template', 'checklist')}} className='bg-white shadow border rounded-lg p-5 w-[300px] h-[350px]'>
                    <p className=' '>Good Morning - Dear Team</p><br />
                    <p>🌀120 Days Renewal Checklist of July🌀 - Last Date to Receive - 21st July 2024</p>
                </div>

                <div onClick={() => {navigate('/messages/notattendedlist'); localStorage.setItem('recent_template', 'notattendedlist')}} className='bg-white shadow border rounded-lg p-5 w-[300px] h-[350px]'>
                    <p className=''>🎡Below are 1 Year Term Members. Request them to  Attend - I Belong</p>
                </div>

                {/* <div className='bg-white shadow border rounded-lg p-5 w-[300px] h-[350px]'>
                    <p className=''><span className='text-red-600'>♦️</span>Dear Team - Reminder</p><br />
                    <p>We request members to complete the bios in BNI Connect.</p><br />
                    <p>If already Updated please ignore it.</p><br />
                    <p>Note: Kindly Update all boxes of Weekly Presentation 1 & 2,</p><br />
                    <p>Tops & Gains Profile. Please Don't Update Nil, a hyphen, or empty in the Fields.</p><br />
                </div> */}
            </div>
        </div>
    )
}
