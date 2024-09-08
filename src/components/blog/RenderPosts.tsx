import React from "react";
import { useColorMode } from "@chakra-ui/react";

// Import cookie
import { useCookies } from "react-cookie";


export default function RenderPosts({ html }: { html: string }) {
  const [cookies, setCookie] = useCookies(["consent", "saved-posts"]);

  const { colorMode, toggleColorMode } = useColorMode();

  let bgColor = colorMode === "light" ? "prose-proselight" : "prose-prosedark";

  // If the user has given consent to the cookie and html is not empty set read-posts cookie 
  // assuming that the user has read the post.
  /*
  [
    {
      "post": "post-slug",
      "read": true
    }
    ...
  ]
  */


  return (
    <div className="flex flex-col items-center justify-center gap-6 pt-8">
      <div
        className={`prose ${bgColor}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
    </div>
  );
}