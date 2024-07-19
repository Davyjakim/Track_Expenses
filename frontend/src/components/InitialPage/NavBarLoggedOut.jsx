import React from 'react'

function NavBarLoggedOut() {
  return (
    <div className="md:h-[250px]" >
      <div className="flex justify-between p-7">
        <h1 className="font-mono font-semibold text-stone-500 md:text-[36px] sm:text-[24px]">
          Track Expenses
        </h1>
        <a className='flex gap-6 md:text-[22px] '  href="/login">
          <div className="flex items-center gap-2  rounded-md font-bold px-3">
            <span>Log in</span>
          </div>
        </a>
      </div>
    </div>
  )
}

export default NavBarLoggedOut
