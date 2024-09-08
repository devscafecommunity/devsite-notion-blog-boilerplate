
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

export interface SimplifiedPage {
  id: string;
  title: string;
  description: string;
  cover: string;
  slug?: string;
  tags: string[];
  created_time: string;
  last_edited_time: string;
  author?: string;
  content: BlockObjectResponse[];
}


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
          content: [],
        };

        return simplifiedPage;
      });

      resolve(simplifiedPages);
    });
  });

  return simplifiedPage;
};