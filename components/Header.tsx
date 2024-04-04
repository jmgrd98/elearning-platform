'use client'

import UserAvatar from "./UserAvatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import Image from "next/image";
import logo from '../public/formando_creators_grande_2_copiar.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { useUser } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area"

const Header = () => {
  const router = useRouter();
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  // const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    router.push(href);
  };

  const onSubscribe = async () => {
    try {
        setLoading(true);
        const response = await axios.get('/api/stripe');

        window.location.href = response.data.url;
    } catch (error) {
        console.error(error, 'STRIPE_CLIENT_ERROR')
    } finally {
        setLoading(false);
    }
};
  return (
    <>
      <div className="bg-black flex items-center justify-between w-full max-w-screen max-h-20 px-5 py-2 top-0">
      <Sheet>
      <SheetTrigger>
        <GiHamburgerMenu width={50} height={50} style={{color: 'white'}} />
      </SheetTrigger>
        <SheetContent className="bg-black p-5 flex flex-col justify-evenly" side={'left'}>
          <SheetHeader>
            <SheetClose>
              <Image onClick={() => handleLinkClick('/')} src={logo} alt="Logo" width={150} height={150} />
            </SheetClose>
            <SheetDescription className="text-white text-xl font-bold mb-5">
              Seja bem-vindo ao Formando Creators, {user?.firstName}!
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-3 items-left">
          {/* <ScrollArea className="h-full w-full rounded-md border">  */}
            <Accordion type="single" collapsible className="w-full text-white">
              <AccordionItem className="w-full" value="item-1">
                <AccordionTrigger >Capítulo 1</AccordionTrigger>
                  <AccordionContent className="w-full">
                      <SheetClose className="w-full">
                        <Button className="w-full" type="submit" variant={'secondary'} onClick={() => handleLinkClick('/lesson1')} >Aula 1</Button>
                      </SheetClose>
                      <SheetClose className="w-full">
                        <Button className="w-full" type="submit" variant={'secondary'} onClick={() => handleLinkClick('/lesson1')} >Aula 2</Button>
                      </SheetClose>
                      <SheetClose className="w-full">
                        <Button className="w-full" type="submit" variant={'secondary'} onClick={() => handleLinkClick('/lesson1')} >Aula 1</Button>
                      </SheetClose>
                    </AccordionContent>
              </AccordionItem>
              <AccordionItem className="w-full" value="item-2">
                <AccordionTrigger >Capítulo 2</AccordionTrigger>
                  <AccordionContent className="w-full">
                      <SheetClose className="w-full">
                        <Button className="w-full" type="submit" variant={'secondary'} onClick={() => handleLinkClick('/lesson1')} >Aula 2</Button>
                      </SheetClose>
                    </AccordionContent>
              </AccordionItem>
              <AccordionItem className="w-full" value="item-3">
                <AccordionTrigger >Capítulo 3</AccordionTrigger>
                  <AccordionContent className="w-full">
                      <SheetClose className="w-full">
                        <Button className="w-full" type="submit" variant={'secondary'} onClick={() => handleLinkClick('/lesson1')} >Aula 3</Button>
                      </SheetClose>
                    </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* </ScrollArea> */}
          </div>

          <SheetClose>
            <Button className="w-full" variant={'purple'} onClick={onSubscribe} >Matricule-se</Button>
          </SheetClose>

        </SheetContent>
        </Sheet>
          <UserAvatar/>
      </div>
    </>
  )
}

export default Header
