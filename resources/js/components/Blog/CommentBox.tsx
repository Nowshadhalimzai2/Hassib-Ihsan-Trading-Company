import { useEffect, useRef } from 'react';

import UserComment from './UserComment';
import { Comment } from './postProps';
const CommentBox = ({ isShowComments, comments }: { isShowComments: boolean; comments: Comment[] }) => {
    const commentsRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (isShowComments && commentsRef.current) {
            // Animate the comment section from the MessageCircle icon upwards
            const comments = commentsRef.current;
            if (comments) {
                // Ensure the comment section overlays the post
                comments.className =
                    'ShowComments absolute inset-0 z-10 h-[85%] w-full md:w-[90%]  mx-auto overflow-y-auto bg-blue-100 rounded-md shadow-lg transition-all duration-300 opacity-0 translate-y-4';

                setTimeout(() => {
                    comments.style.opacity = '1';
                    comments.style.transform = 'translateY(0)';
                }, 80);
            }
        }
    }, [isShowComments]);

    return (
        <div ref={commentsRef} className="ShowComments fixed h-screen bg-blue-100">
            {comments.map((comment) => (
                <UserComment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentBox;
