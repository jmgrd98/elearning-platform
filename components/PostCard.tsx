'use client'

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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const PostCard = () => {
  return (
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Post title</CardTitle>
      <CardDescription>Post description</CardDescription>
    </CardHeader>
    <CardContent>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus quaerat aut voluptatem natus ipsam, facilis quasi expedita minima excepturi et! Eius quidem aut nam animi impedit minima atque tempora molestias!
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button>Deploy</Button>
    </CardFooter>
  </Card>
  )
}

export default PostCard
