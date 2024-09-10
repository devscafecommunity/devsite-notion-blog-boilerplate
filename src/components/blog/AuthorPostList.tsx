// Get all recent posts from: /api/blog/getrecent
/*
[
  {
    "id": "e3b7d032-44bd-4a77-8fef-6472617d5c21",
    "title": "Titulo do post",
    "description": "Descrição do post etc…",
    "cover": "https://i.imgur.com/SL6jvOr.png",
    "tags": [
      "test"
    ],
    "created_time": "2024-09-07T19:02:00.000Z",
    "last_edited_time": "2024-09-07T23:20:00.000Z",
    "content": []
  }
]
*/

// Chakra
import { Heading } from "@chakra-ui/react";

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

export default function AuthorPostList({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {posts.length === 0 ? (
        <div>
          <Heading>No posts found, or being loaded</Heading>
        </div>
      ) : (
        <div>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
