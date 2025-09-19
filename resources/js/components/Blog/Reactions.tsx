import { router } from '@inertiajs/react';
import axios from 'axios';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import CommentBox from './CommentBox';
import { Post as PostProps } from './postProps';

interface ReactionsProps extends PostProps {
    isShowComments: boolean;
    setIsShowComments: React.Dispatch<React.SetStateAction<boolean>>;
    auth_id: number | undefined;
}
function Reactions({ isShowComments, setIsShowComments, ...post }: ReactionsProps) {
    // if the user liked the post already the isLiked state should be true
    // console.log('post_id', id, like?.post_id, like?.user_id, auth_id);
    const [isLiked, setIsLiked] = useState(() => post.likes.some((like) => like.pivot.user_id === post.auth_id && like.pivot.post_id === post.id)); ////
    const [message, setMessage] = useState<string>('');
    const [likesCount, setLikesCount] = useState(post.likes_count);
    console.log('likes count', likesCount);

    useEffect(() => {
        const liked = post.likes.some((like) => like.pivot.user_id === post.auth_id && like.pivot.post_id === post.id);
        setIsLiked(liked);
    }, [post.likes, post.auth_id, post.id]);

    const submit = () => {
        if (message) {
            // send message to backend
            router.post(
                route('comment.post', { content: message, id: post.id }),
                {},
                {
                    onSuccess: () => {
                        setMessage('');
                    },
                },
            );
        }
    };
    const sentLikeToBackend = () => {
        const newIsLiked = !isLiked; // flip the current value

        setIsLiked(newIsLiked); // update state
        setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1)); // update count
        axios
            .post(route('like.post', { id: post.id, isLiked: newIsLiked }))
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error liking the post:', error);
            });
    };

    return (
        // the following onclick events will close the comment box if the reactions area is clicked
        <div className="">
            <div className="Reactions mt-1 flex grow items-center gap-5 rounded-md bg-blue-50 px-2 py-1 md:px-4 dark:bg-slate-800">
                <button
                    type="button"
                    aria-label={isLiked ? 'Unlike' : 'Like'}
                    className="focus:outline-none"
                    onClick={() =>
                        post.auth_id ? sentLikeToBackend() : confirm('You must be logged in to like a post') && router.get(route('login'))
                    }
                >
                    {isLiked ? (
                        <Heart className="size-6 fill-red-500 text-lg text-red-500 md:size-8" />
                    ) : (
                        <Heart className="size-6 text-lg text-red-500 md:size-8" />
                    )}
                    <p className="LIkesCount -mb-1 text-red-500">{likesCount}</p>
                </button>
                <div className="flex-1 px-0 md:px-4">
                    <div className="flex items-center justify-between space-x-3 md:space-x-6">
                        <button onClick={() => setIsShowComments(!isShowComments)}>
                            <MessageCircle className="size-6 text-gray-600 md:size-8 dark:text-lime-400" />
                        </button>

                        <div className="flex h-10 flex-1 items-center rounded-md bg-white focus:outline-lime-400">
                            <input
                                className="h-full flex-1 px-0 pl-1 placeholder:text-gray-400 focus:outline-lime-400 md:px-4 dark:bg-slate-800"
                                placeholder="Type your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                tabIndex={0}
                            />
                            <p className="dark:bg-slate-8 px-2 text-gray-600">{post.comments_count}</p>
                            <button onClick={submit}>
                                <Send className="size-5 text-gray-600 hover:text-lime-400 md:size-7 dark:text-lime-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isShowComments && <CommentBox comments={post.comments} isShowComments={isShowComments} />}
        </div>
    );
}
export default Reactions;
