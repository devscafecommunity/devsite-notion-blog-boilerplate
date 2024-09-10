// Chakra
import { useToast } from "@chakra-ui/react";

// React
import { useEffect, useState } from "react";

// PostCard component
import PostCard from "./PostCard";

export interface Post {
  id: string;
  title: string;
  description: string;
  cover: string;
  slug?: string;
  tags: string[];
  created_time: string;
  last_edited_time: string;
  author?: string;
  content: string;
}

export default function IndexPostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setLoading] = useState(true);

  const toast = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        toast({
          title: "Loading taking too long",
          description: "Please try again later",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          //   window.location.href = "/";
          toast.closeAll();
          toast({
            title: "Can't load posts",
            description:
              "We are having trouble loading the posts, please try again later, redirecting to home page...",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        }, 10000);
      }
    }, 20000);
    return () => clearTimeout(timer);
  }, [loading, toast]);

  let attempts = 0;

  useEffect(() => {
    fetch("/api/blog/getrecent")
      .then((res) => res.json())
      .then((data) => {
        // Verify if the data is an error or empty
        attempts++;
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        } else if (data.length === 0) {
          toast({
            title: "No posts",
            description:
              "Recived empty posts, trying again..., [Attempt: " +
              attempts +
              "]",
            status: "info",
            duration: 9000,
            isClosable: true,
          });
          return;
        } else {
          setPosts(data);
          setLoading(false);
        }
      });
  }, [attempts, toast]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {posts.map((post: Post) => (
        <PostCard key={post.id} loading={loading} post={post} />
      ))}
    </div>
  );
}
