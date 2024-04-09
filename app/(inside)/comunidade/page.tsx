'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"


const page = () => {


  return (
    <div className="p-5 text-center flex flex-col gap-10 items-center">
      <h1 className='text-4xl font-bold'>Comunidade</h1>

      <p>Interaja com a comunidade de Creators!</p>

      <Input placeholder="Pesquise por posts, tags ou usuários..." className='w-1/2' />

      
    </div>
  )
}

export default page
