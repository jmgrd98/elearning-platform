'use client'

import { useRouter } from 'next/navigation';


const Sidebar = () => {
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="w-1/5 min-h-screen left-0 bg-black text-white p-5">
      <p className="font-bold text-2xl mb-10">Formando Creators</p>
      <div className="flex flex-col gap-3 items-left">
        <button onClick={() => handleLinkClick('/lesson1')} className="hover:bg-white hover:text-black p-2 rounded w-full">Aula 1</button>
        <button onClick={() => handleLinkClick('/lesson2')} className="hover:bg-white hover:text-black p-2 rounded w-full">Aula 2</button>
        <button onClick={() => handleLinkClick('/lesson3')} className="hover:bg-white hover:text-black p-2 rounded w-full">Aula 3</button>
      </div>
    </div>
  );
};

export default Sidebar;
