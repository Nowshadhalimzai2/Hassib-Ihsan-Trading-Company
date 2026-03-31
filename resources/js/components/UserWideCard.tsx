// interface Props {
//     user: { id: number; name: string; email: string; address: string; phone: string };

import { User } from '@/types';

// }
const UserWideCard = ({ user }: { user: User }) => {
    return (
        <div className="mt-2 rounded-sm border border-blue-400 bg-blue-500/10 text-blue-400 hover:shadow dark:hover:bg-gray-900">
            <a href={route(`admin.${user.role.name}.show`, user.id)} key={user.id} className="block p-4">
                <div className="flex justify-between">
                    <div className="Name_Email">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                    <p className="text-gray-600">{user.phone}</p>
                </div>

                {/* <p className="text-gray-600">{user.address}</p> */}
            </a>
        </div>
    );
};

export default UserWideCard;
