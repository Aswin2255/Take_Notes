import React from 'react'
import Sidebar from './Sidebar'

function Layout({children,modal,userid}) {
  return (
    <div>
      
    <div className='md:flex mt-4 max-w-3xl mx-auto gap-6'>
 <div className=' sticky md:w-3/12'>
   <Sidebar modal = {modal} userid = {userid}/>

 </div>
 <div className=' mx-4 md:mx-0 md:w-9/12'>
   {children}
  


 </div>

</div>
 
</div>
  )
}

export default Layout
