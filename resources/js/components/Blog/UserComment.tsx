import logo from '../../../../public/images/nobgLogo.png';
import { Comment } from './postProps';
const UserComment = ({ comment }: { comment: Comment }) => {
    return (
        <>
            <div className="mb-1 flex space-x-1 rounded-sm bg-white/40 p-1">
                <div className="UserImage h-12 w-12 rounded-full">
                    <img src={logo} alt="user" className="size-full" />
                </div>
                <div className="CommentContent flex flex-col">
                    <span className="1">user1</span>
                    <span className="2">{comment.content}</span>
                </div>
            </div>
        </>
    );
};

export default UserComment;
