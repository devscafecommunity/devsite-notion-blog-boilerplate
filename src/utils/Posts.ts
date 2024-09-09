
import Author from "@/pages/blog/authors/[nickname]";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});


/*
{
  "object": "list",
  "results": [
    {
      "object": "page",
      "id": "e3b7d032-44bd-4a77-8fef-6472617d5c21",
      "created_time": "2024-09-07T19:02:00.000Z",
      "last_edited_time": "2024-09-09T09:27:00.000Z",
      "created_by": {
        "object": "user",
        "id": "2439e043-c4de-4dac-8bca-225299af2a76"
      },
      "last_edited_by": {
        "object": "user",
        "id": "2439e043-c4de-4dac-8bca-225299af2a76"
      },
      "cover": null,
      "icon": null,
      "parent": {
        "type": "database_id",
        "database_id": "addea0f2-cba2-4fdc-8d82-b32e64906255"
      },
      "archived": false,
      "in_trash": false,
      "properties": {
        "Public": {
          "id": "%3BW%60%3B",
          "type": "checkbox",
          "checkbox": true
        },
        "Tags": {
          "id": "ATY%3C",
          "type": "multi_select",
          "multi_select": [
            {
              "id": "ffdd3fce-75b3-43be-af0e-6d0738d44874",
              "name": "test",
              "color": "brown"
            }
          ]
        },
        "Cover": {
          "id": "V_dq",
          "type": "files",
          "files": [
            {
              "name": "https://i.imgur.com/SL6jvOr.png",
              "type": "external",
              "external": {
                "url": "https://i.imgur.com/SL6jvOr.png"
              }
            },
            {
              "name": "logo.png",
              "type": "file",
              "file": {
                "url": "https://prod-files-secure.s3.us-west-2.amazonaws.com/85c4480b-12de-4f18-9680-cdcf0319f9dc/1ad3e8d8-9d73-4bcf-af94-7981ef969156/logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240909%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240909T093632Z&X-Amz-Expires=3600&X-Amz-Signature=85870cce8b86330272fdb2ccb30fde8ad26c37137e1086b36de923c10e917fb1&X-Amz-SignedHeaders=host&x-id=GetObject",
                "expiry_time": "2024-09-09T10:36:32.515Z"
              }
            }
          ]
        },
        "Description": {
          "id": "WOog",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Descrição do post etc…",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Descrição do post etc…",
              "href": null
            }
          ]
        },
        "Author": {
          "id": "hf%3Ff",
          "type": "people",
          "people": [
            {
              "object": "user",
              "id": "2439e043-c4de-4dac-8bca-225299af2a76",
              "name": "Pedro Kaleb De Je1",
              "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKbcJ0_7ZFPqvQfRPCFhcmW3idKldcPxpZVGsTPwSfT3Yw4pM3s=s100",
              "type": "person",
              "person": {
                "email": "pedrokalebdej1@gmail.com"
              }
            }
          ]
        },
        "slug": {
          "id": "u%60F%3D",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "test",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "test",
              "href": null
            }
          ]
        },
        "Title": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "Titulo do post",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Titulo do post",
              "href": null
            }
          ]
        }
      },
      "url": "https://www.notion.so/Titulo-do-post-e3b7d03244bd4a778fef6472617d5c21",
      "public_url": null
    }
  ],
  "next_cursor": null,
  "has_more": false,
  "type": "page_or_database",
  "page_or_database": {},
  "request_id": "1c3a4271-2929-4866-b154-bd09f02784d3"
}
*/
export interface SimplifiedPage {
  id: string;
  title: string;
  description: string;
  cover: string;
  slug?: string;
  tags: string[];
  created_time: string;
  last_edited_time: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    banner: string;
    email: string;
  };
  content: BlockObjectResponse[];
}

//

export const getPages = async () => {
  return notionClient.databases.query({
    filter: {
      property: "Public",
      checkbox: {
        equals: true,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  });
};

export const getPostBySlug = async (slug: string) => {
  return notionClient.databases.query({
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  });
}

export const getPostIdBySlug = async (slug: string) => {
  return notionClient.databases.query({
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  }).then((res) => res.results[0].id);
};

export const getPostContent = async (pageId: string) => {
  return notionClient.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[]);
};

export const getPostDataSimplifiedBySlug = async (slug: string) => {
  const data = notionClient.databases.query({
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  }) as Promise<any>;

  const page = new Promise<SimplifiedPage>((resolve, reject) => {
    data.then((res) => {
      const page = res.results[0] as PageObjectResponse;
      const properties = page.properties as any;

      const cover = properties.Cover.files[0].external.url || properties.Cover.files[0].file.url;

      const simplifiedPage: SimplifiedPage = {
        id: page.id,
        title: properties.Title.title[0].plain_text,
        description: properties.Description.rich_text[0].plain_text,
        cover,
        slug: properties.slug.rich_text[0].plain_text,
        tags: properties.Tags.multi_select.map((tag: any) => tag.name),
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        author: {
          id: properties.Author.people[0].id,
          name: properties.Author.people[0].name,
          avatar: properties.Avatar.files[0].external.url || properties.Avatar.files[0].file.url,
          banner: properties.Banner.files[0].external.url || properties.Banner.files[0].file.url,
          email: properties.Author.people[0].person.email,
        },
        content: [],
      };

      resolve(simplifiedPage);
    });
  });

  return page;
};

export const getPostDataSimplified = async () => {
  const data = notionClient.databases.query({
    filter: {
      property: "Public",
      checkbox: {
        equals: true,
      },
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  }) as Promise<any>;

  const simplifiedPage = new Promise<SimplifiedPage[]>((resolve, reject) => {
    data.then((res) => {
      const pages = res.results as PageObjectResponse[];

      const simplifiedPages = pages.map((page) => {
        const properties = page.properties as any;

        const cover = properties.Cover.files[0].external.url || properties.Cover.files[0].file.url;

        const simplifiedPage: SimplifiedPage = {
          id: page.id,
          title: properties.Title.title[0].plain_text,
          description: properties.Description.rich_text[0].plain_text,
          cover,
          slug: properties.slug.rich_text[0].plain_text,
          tags: properties.Tags.multi_select.map((tag: any) => tag.name),
          created_time: page.created_time,
          last_edited_time: page.last_edited_time,
          author: {
            id: properties.Author.people[0].id,
            name: properties.Author.people[0].name,
            avatar: "",
            banner: "",
            email: properties.Author.people[0].person.email,
          },
          content: [],
        };

        return simplifiedPage;
      });

      resolve(simplifiedPages);
    });
  });

  return simplifiedPage;
};

// Authors
/*
{
  "object": "list",
  "results": [
    {
      "object": "page",
      "id": "7fbdcbf1-de6c-472b-b35a-e4c3dbbe22ab",
      "created_time": "2024-09-08T15:43:00.000Z",
      "last_edited_time": "2024-09-09T09:28:00.000Z",
      "created_by": {
        "object": "user",
        "id": "2439e043-c4de-4dac-8bca-225299af2a76"
      },
      "last_edited_by": {
        "object": "user",
        "id": "2439e043-c4de-4dac-8bca-225299af2a76"
      },
      "cover": null,
      "icon": null,
      "parent": {
        "type": "database_id",
        "database_id": "92d93dbe-f6ee-427f-b767-e5b6ce1ec371"
      },
      "archived": false,
      "in_trash": false,
      "properties": {
        "Name": {
          "id": "%3B%3Dj%3B",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Pedro Kaleb de Jesus",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Pedro Kaleb de Jesus",
              "href": null
            }
          ]
        },
        "Bio": {
          "id": "%40aKz",
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Test",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Test",
              "href": null
            }
          ]
        },
        "website": {
          "id": "Djh%40",
          "type": "url",
          "url": "https://pedrokalebdev.pt"
        },
        "github": {
          "id": "XwMp",
          "type": "url",
          "url": "https://github.com/LyeZinho"
        },
        "twitter": {
          "id": "%5Bz%3DR",
          "type": "url",
          "url": "https://x.com/PeJesus"
        },
        "Person": {
          "id": "snql",
          "type": "people",
          "people": [
            {
              "object": "user",
              "id": "2439e043-c4de-4dac-8bca-225299af2a76",
              "name": "Pedro Kaleb De Je1",
              "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKbcJ0_7ZFPqvQfRPCFhcmW3idKldcPxpZVGsTPwSfT3Yw4pM3s=s100",
              "type": "person",
              "person": {
                "email": "pedrokalebdej1@gmail.com"
              }
            }
          ]
        },
        "instagram": {
          "id": "w%3Fha",
          "type": "url",
          "url": "https://instagram/pedrokj"
        },
        "Avatar": {
          "id": "wyyi",
          "type": "files",
          "files": [
            {
              "name": "https://i.imgur.com/SL6jvOr.png",
              "type": "external",
              "external": {
                "url": "https://i.imgur.com/SL6jvOr.png"
              }
            },
            {
              "name": "logo.png",
              "type": "file",
              "file": {
                "url": "https://prod-files-secure.s3.us-west-2.amazonaws.com/85c4480b-12de-4f18-9680-cdcf0319f9dc/2ee7a77a-9640-4172-aa6a-e8c3e1a8529a/logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240909%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240909T093416Z&X-Amz-Expires=3600&X-Amz-Signature=12e991827a556483fc2c5882234bd9df1df436e432738a7a0a1602faaa29d14b&X-Amz-SignedHeaders=host&x-id=GetObject",
                "expiry_time": "2024-09-09T10:34:16.055Z"
              }
            }
          ]
        },
        "Nickname": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "lyeezinho",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "lyeezinho",
              "href": null
            }
          ]
        }
      },
      "url": "https://www.notion.so/lyeezinho-7fbdcbf1de6c472bb35ae4c3dbbe22ab",
      "public_url": null
    }
  ],
  "next_cursor": null,
  "has_more": false,
  "type": "page_or_database",
  "page_or_database": {},
  "request_id": "70c962a1-211a-47f1-86bb-8e396c60ab89"
}
*/

interface Author {
  id: string;
  name: string;
  bio: string;
  social: {
    website: string;
    github: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  avatar: string;
  banner: string;
  nickname: string;
}

export const getAuthors = async () => {
  return notionClient.databases.query({
    database_id: process.env.AUTHORS_DATABASE_ID!,
  });
};

export const getAuthorById = async (id: string) => {
  return notionClient.pages.retrieve({ page_id: id });
};

export const getAuthorByNickname = async (nickname: string) => {
  return notionClient.databases.query({
    filter: {
      property: "Nickname",
      title: {
        equals: nickname,
      },
    },
    database_id: process.env.AUTHORS_DATABASE_ID!,
  });
};

export const getAuthorByEmail = async (email: string) => {
  return notionClient.databases.query({
    filter: {
      property: "Person",
      people: {
        contains: email,
      },
    },
    database_id: process.env.AUTHORS_DATABASE_ID!,
  });
}

export const getAuthorPosts = async (nickname: string) => {
  let author = await notionClient.databases.query({
    filter: {
      property: "Nickname",
      title: {
        equals: nickname,
      },
    },
    database_id: process.env.AUTHORS_DATABASE_ID!,
  }) as any;
  let authorId = author.results[0].properties.Person.people[0].id;

  let posts = await notionClient.databases.query({
    filter: {
      and: [
        {
          property: "Author",
          people: {
            contains: authorId,
          },
        },
        {
          property: "Public",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    database_id: process.env.POSTS_DATABASE_ID!,
  });

  return posts.results.map((page: any) => {
    const properties = page.properties as any;
    const cover = properties.Cover.files[0].external.url || properties.Cover.files[0].file.url;
    const simplifiedPage: SimplifiedPage = {
      id: page.id,
      title: properties.Title.title[0].plain_text,
      description: properties.Description.rich_text[0].plain_text,
      cover,
      slug: properties.slug.rich_text[0].plain_text,
      tags: properties.Tags.multi_select.map((tag: any) => tag.name),
      created_time: page.created_time,
      last_edited_time: page.last_edited_time,
      author: {
        id: properties.Author.people[0].id,
        name: properties.Author.people[0].name,
        avatar: "",
        banner: "",
        email: properties.Author.people[0].person.email,
      },
      content: [],
    };
    return simplifiedPage;
  });
}

export const getAuthorData = async (nickname: string) => {
  return await notionClient.databases.query({
    filter: {
      property: "Nickname",
      title: {
        equals: nickname,
      },
    },
    database_id: process.env.AUTHORS_DATABASE_ID!,
  }) as any;
}

export const getAuthorDataSimplifyedByNickname = async (nickname: string) => {
  let authorraw = await notionClient.databases.query({
    filter: {
      property: "Nickname",
      title: {
        equals: nickname,
      },
    },
    database_id: process.env.AUTHORS_DATABASE_ID!,
  }) as any;  

  let author = {
    id: authorraw.results[0].id,
    name: authorraw.results[0].properties.Name.rich_text[0].plain_text,
    bio: authorraw.results[0].properties.Bio.rich_text[0].plain_text,
    avatar: authorraw.results[0].properties.Avatar.files[0].external.url || authorraw.results[0].properties.Avatar.files[0].file.url,
    banner: authorraw.results[0].properties.Banner.files[0].external.url || authorraw.results[0].properties.Banner.files[0].file.url,
    social: {
      github: authorraw.results[0].properties.Github?.url,
      instagram: authorraw.results[0].properties.Instagram?.url,
      website: authorraw.results[0].properties.Website?.url,
      linkedin: authorraw.results[0].properties.Linkedin?.url,
      twitter: authorraw.results[0].properties.Twitter?.url,
    },
  }

  return author;
};