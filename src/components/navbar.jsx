import React from 'react'

export const navbar = () => {
  return (
   <nav className='flex justify-between bg-indigo-900 text-white py-2'>
    <div className="logo"><span className='font-bold text-xl mx-8'>iTask</span></div>
    <ul className='gap-8 flex mx-9'>
      <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
      <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      
    </ul>
   </nav>
  )
}
export default navbar