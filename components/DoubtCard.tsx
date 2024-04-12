'use client'

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { IoIosCloseCircle } from "react-icons/io";
import { Doubt } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";

interface DoubtCardProps {
  doubt: Doubt;
  authorId: string;
  handleDeleteDoubt: (doubtId: string) => void;
}

const DoubtCard = ({ doubt, authorId, handleDeleteDoubt }: DoubtCardProps) => {

  const [doubtAuthor, setDoubtAuthor] = useState<User>();

  useEffect(() => {
    const fetchDoubtAuthor = async () => {
      try {
        const response = await axios.get(`/api/users/${authorId}`);
        setDoubtAuthor(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoubtAuthor();
  }, [authorId]);

  const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

  return (
    <Card className='bg-black/20'>
      <CardHeader className=" p-2 rounded-md flex items-center gap-5">
        <Avatar>
            <AvatarImage src={doubtAuthor?.imageUrl} />
            <AvatarFallback>
            {doubtAuthor?.firstName?.charAt(0)}
            {doubtAuthor?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-left gap-3 w-full">
            <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
                <p className="font-bold">
                {doubtAuthor?.firstName} {doubtAuthor?.lastName}
                </p>
                <p className="text-sm">{formatDate(doubt.createdAt.toString())}</p>
            </div>
            <IoIosCloseCircle
                onClick={() => handleDeleteDoubt(doubt.id)}
                className="text-red-500/80 hover:text-red-500 cursor-pointer w-[25px] h-[25px]"
            />
            </div>
        </div>
        </CardHeader>
      <CardContent>
        <p className="p-2 rounded">{doubt.content}</p>
      </CardContent>
    </Card>
  );
};

export default DoubtCard;
