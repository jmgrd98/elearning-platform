'use client'

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreatePostForm from "@/components/CreatePostForm";
import { Post } from "@prisma/client";

const Page = () => {

  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [dialogOpen])

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
      setFilteredPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: any) => {
    const searchValue = e.target.value.toLowerCase();
    setInputValue(searchValue);
    const filtered = posts.filter((post: Post) =>
      post.title.toLowerCase().includes(searchValue)
    );
    setFilteredPosts(filtered);
  };

  return (
    <>
      <div className="p-5 text-center flex flex-col gap-10 items-center">
        <h1 className="text-4xl font-bold">Comunidade</h1>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant={"purple"}
              className="rounded p-3 cursor-pointer"
            >
              Criar post
            </Button>
          </DialogTrigger>
          <DialogContent
            className="h-full w-full max-h-[500px] p-3"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader className="h-full">
              <DialogTitle className="text-xl font-bold mb-5">
                Criar post
              </DialogTitle>
              <CreatePostForm onClose={() => {setDialogOpen(false); fetchPosts()}} />
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <p>Interaja com a comunidade de Creators!</p>

        <div className="flex items-center justify-center gap-5 w-full">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Pesquise por posts, tags ou usuários..."
            className="w-2/3"
          />

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="+likes">Mais likes</SelectItem>
                <SelectItem value="-likes">Menos likes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full p-10">
          {filteredPosts.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
