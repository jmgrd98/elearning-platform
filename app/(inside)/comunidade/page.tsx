'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Button } from "@/components/ui/button"

const page = () => {


  return (
    <div className="p-5 text-center flex flex-col gap-10 items-center">
      <h1 className='text-4xl font-bold'>Comunidade</h1>

      <p>Interaja com a comunidade de Creators!</p>

      <Input placeholder="Pesquise por posts, tags ou usuários..." className='w-1/2' />

      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Post name</CardTitle>
        <CardDescription>Post description</CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default page
