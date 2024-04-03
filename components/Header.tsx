'use client'

import UserAvatar from "./UserAvatar"

const Header = () => {
  return (
    <div className="bg-gray-500/50 flex items-center justify-between w-full max-w-screen max-h-20 px-5 py-2 top-0">
      <p>KREATOR HEADER</p>
        <UserAvatar/>
    </div>
  )
}

export default Header
