

interface Post {
  
        id: number;
        content: string;
        file_path: string;
        created_at: Date;
        images: string;
        comments: Array<Comment>;
        contacts_count: number;
        likes_count: number;
        likes: Like[];
}
interface Comment {
    id: number;
    content: string;
    user: UserProps;
}
interface Like{
    id: number;
    // user: UserProps;
    pivot:{
        user_id:number
        post_id: number;
    }
}

interface UserProps{
    id:number;
    name:string;
}
export type { Post, Comment, UserProps,Like };