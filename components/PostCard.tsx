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

const PostCard = ({ post }: any) => {
  return (
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>{post.title}</CardTitle>
      <CardDescription>{post.content}</CardDescription>
    </CardHeader>
    <CardContent>
      {post.content}
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button>Deploy</Button>
    </CardFooter>
  </Card>
  )
}

export default PostCard
