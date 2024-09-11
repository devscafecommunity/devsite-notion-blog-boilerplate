export default interface PostData {
    id: string;
    title: string;
    description: string;
    cover: string;
    slug: string;
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
    content: string[];
    contentstring: string;
}