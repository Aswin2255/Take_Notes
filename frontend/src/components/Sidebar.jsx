import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

function Sidebar({modal,userid}) {

  const Navigate = useNavigate()
  const viewmodal = ()=>{
    modal(true)
    
  }
  return (
    <div className='px-4 py-2'>
         <p  onClick={viewmodal} className='flex gap-2 py-3  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer'>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

                    Activity</p>
      
    </div>
  )
}

export default Sidebar
