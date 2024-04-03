'use client'

import Link from "next/link"

const Sidebar = () => {
  return (
    <div className="w-1/5 min-h-screen left-0 bg-black text-white">
      <Link href="/lesson1">Aula 1</Link>
      <Link href="/lesson2">Aula 2</Link>
      <Link href="/lesson3">Aula 3</Link>
    </div>
  )
}

export default Sidebar
