'use client'

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { IoIosCloseCircle } from "react-icons/io";
import { Doubt } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

interface DoubtCardProps {
  doubt: Doubt;
  user: any;
  handleDeleteDoubt: (doubtId: string) => void;
}

const DoubtCard = ({ doubt, user, handleDeleteDoubt }: DoubtCardProps) => {

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
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-left gap-3 w-full">
            <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
                <p className="font-bold">
                {user?.firstName} {user?.lastName}
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
