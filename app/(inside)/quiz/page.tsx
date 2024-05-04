'use client'

import {useEffect, useState} from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios';

const page = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await axios.get(`https://tryvia.ptr.red/api_category.php`);
        const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=19`);
        const responseTEst = await axios.get(`https://tryvia.ptr.red/api.php?amount=10&category=19`);
        console.log('CATEGORIES', categories)
        console.log('TEST', responseTEst)
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);


  return (
    <div className="p-5 text-center flex flex-col gap-10 items-center">
    <h1 className='text-5xl font-bold'>Quizes</h1>


    <h2 >Selecione a categoria</h2>
  </div>
  )
}

export default page
