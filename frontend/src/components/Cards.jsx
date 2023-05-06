import React from 'react'

function Cards({children,nopading}) {
  let clases = 'bg-white shadow-md  shadow-gray-300 rounded-lg  mb-5'
  if(!nopading){
    clases += ' p-4'
    
  }
  return (
    <div className={clases}>
      {children}

    </div>
   


  )
}

export default Cards