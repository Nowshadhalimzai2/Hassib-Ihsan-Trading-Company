import { useState } from 'react';
import logo from '../../../../public/images/nobgLogo.png';
import Reactions from './Reactions';
import { Post as PostProps } from './postProps';
interface AuthID extends PostProps {
    auth_id: number | undefined;
}

const Post = (post: AuthID) => {
    const [isShowText, setIsShowText] = useState(false);
    const [isShowComments, setIsShowComments] = useState(false);

    return (
        <div
            className="relative mx-auto max-w-xl rounded-lg bg-white/10 p-2 shadow-lg sm:p-4"
            onClick={() => isShowComments && setIsShowComments((prev) => !prev)}
        >
            <div className="Title mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={logo} className="size-13"></img>
                    <div>
                        <h5 className="active underline-0 mb-1">Basit Ishaq Ltd</h5>
                        <p className="text-sm text-black/40 dark:text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
                {post.auth_id && (
                    <a tabIndex={2} href={route('blog.edit', post.id)} className="hover:text-blue-500">
                        Edit
                    </a>
                )}
            </div>
            <div className="Contents">
                <p className="mb-3 text-gray-600 dark:text-gray-400">
                    {isShowText ? post.content : post.content.slice(0, 100)}
                    {post.content.length >= 100 && (
                        <button onClick={() => setIsShowText((pre) => !pre)} className="pl-2 text-blue-400 hover:underline">
                            {isShowText ? 'see less' : 'see more...'}
                        </button>
                    )}
                </p>
                {post.file_path && <img className="h-full w-full rounded-md" src={`${post.file_path}`} />}
            </div>
            <Reactions {...post} isShowComments={isShowComments} setIsShowComments={setIsShowComments} />
            {/* This is the comment show fields */}
        </div>
    );
};

export default Post;
