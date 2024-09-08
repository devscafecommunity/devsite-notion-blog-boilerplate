import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text, Heading, Divider } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";

import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";

import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";
import { LuBookOpen, LuBookOpenCheck } from "react-icons/lu";
import { FaBookReader } from "react-icons/fa";

import { useCookies } from "react-cookie";

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

export default function PostCard({
  post,
  loading,
}: {
  post: Post;
  loading: boolean;
}) {
  const [cookies, setCookie] = useCookies([
    "consent",
    "saved-posts",
    "read-posts",
  ]);

  const toast = useToast();

  function handleSave(post: any) {
    if (cookies.consent === false) {
      toast({
        title: "Consent required",
        description: "Please enable cookies to save posts",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else if (cookies.consent === true) {
      let savedPosts = cookies["saved-posts"] || [];
      let index = savedPosts.findIndex((p: any) => p.id === post.id);
      if (index === -1) {
        savedPosts.push(post);
        toast({
          title: "Post saved",
          description: "You can view your saved posts in the saved posts page",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        savedPosts.splice(index, 1);
        toast({
          title: "Post removed",
          description: "You can view your saved posts in the saved posts page",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      }
      setCookie("saved-posts", savedPosts, { path: "/" });
    } else {
      toast({
        title: "Consent required",
        description: "Please enable cookies to save posts",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  function postIsSaved(post: any) {
    let savedPosts = cookies["saved-posts"] || [];
    let index = savedPosts.findIndex((p: any) => p.id === post.id);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }

  function postIsReaded(post: any) {
    let readPosts = cookies["read-posts"] || [];
    let index = readPosts.findIndex((p: any) => p.post === post.id);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      key={post.id}
    >
      <Card className="flex flex-row gap-4">
        <CardHeader>
          <Skeleton
            isLoaded={!loading}
            className="flex flex-row gap-4 rounded-lg"
          >
            <Image
              src={post.cover}
              alt={post.title}
              width="200px"
              height="200px"
              borderRadius="lg"
            />
          </Skeleton>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Skeleton
            isLoaded={!loading}
            className="flex flex-col gap-4 rounded-lg"
          >
            <Heading as="h2">{post.title}</Heading>
          </Skeleton>
          <Skeleton
            isLoaded={!loading}
            className="flex flex-col gap-4 rounded-lg"
          >
            <Text>{post.description}</Text>
          </Skeleton>
          <Skeleton
            isLoaded={!loading}
            className="flex flex-col gap-4 rounded-lg"
          >
            <Text>
              {new Date(post.created_time).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Skeleton>
          <Skeleton
            isLoaded={!loading}
            className="flex flex-col gap-4 rounded-lg"
          >
            {/* Max 3 tags */}
            <div className="flex flex-row gap-4">
              {post.tags.slice(0, 3).map((tag: string) => (
                <Tag key={tag} colorScheme="blue">
                  {tag}
                </Tag>
              ))}
            </div>
          </Skeleton>
          <Divider />
          <Skeleton
            isLoaded={!loading}
            className="flex flex-col gap-4 rounded-lg"
          >
            <ButtonGroup className="flex flex-row gap-4 justify-center items-center">
              <Skeleton isLoaded={!loading}>
                <Button
                  colorScheme="blue"
                  onClick={() =>
                    (window.location.href = `/blog/posts/${post.slug}`)
                  }
                >
                  <FaBookReader size={30} />
                </Button>
              </Skeleton>
              {postIsSaved(post) ? (
                <Skeleton isLoaded={!loading}>
                  <Button colorScheme="red" onClick={() => handleSave(post)}>
                    <CiBookmarkCheck size={30} />
                  </Button>
                </Skeleton>
              ) : (
                <Skeleton isLoaded={!loading}>
                  <Button colorScheme="green" onClick={() => handleSave(post)}>
                    <CiBookmark size={30} />
                  </Button>
                </Skeleton>
              )}

              {postIsReaded(post) ? (
                <Skeleton isLoaded={!loading}>
                  <LuBookOpenCheck size={30} />
                </Skeleton>
              ) : (
                <Skeleton isLoaded={!loading}>
                  <LuBookOpen size={30} />
                </Skeleton>
              )}
            </ButtonGroup>
          </Skeleton>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </motion.div>
  );
}
