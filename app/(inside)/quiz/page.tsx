import {useState} from 'react'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div className="p-5 text-center flex flex-col gap-10 items-center">
    <h1 className='text-5xl font-bold'>Quizes</h1>


    <Button variant={'purple'}>Continuar de onde parei</Button>
  </div>
  )
}

export default page
