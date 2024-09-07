import { NotionRenderer } from "@notion-render/client";
import { notFound } from "next/navigation";

//Plugins
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";

// React next
import { GetServerSideProps } from "next"; // Next server side props
import { useRouter } from "next/router"; // Routing
import { useEffect, useState } from "react"; // React

// Notion client
import { notionClient } from "@/utils/Posts";

// Components
import RenderPosts from "@/components/blog/RenderPosts";

// Chackra UI
import { Text, Heading } from "@chakra-ui/react";

interface Post {
  id: string;
  title: string;
  description: string;
  cover: string;
  tags: string[];
  created_time: string;
  last_edited_time: string;
  content: string;
}

// Static props
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params ?? {};
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`http://localhost:3000/api/blog/posts/${slug}`); // Fetch the post content from the api: /api/blog/posts/[slug]
  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const post = await res.json();
  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  notionRenderer.use(hljsPlugin({}));
  notionRenderer.use(bookmarkPlugin(undefined));

  const html = await notionRenderer.render(...post.content);

  return {
    props: {
      post: {
        ...post,
        content: html,
      },
    },
  };
}

// Post page component
export default function PostPage({ post }: { post: Post }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (post) {
      setLoading(false);
    }
  }, [post]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Heading as="h1">{post.title}</Heading>
      <Text>{post.description}</Text>
      <RenderPosts html={post.content} />
    </div>
  );
}
