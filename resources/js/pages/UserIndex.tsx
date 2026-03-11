import Search from '@/components/SearchUser';
import { Input } from '@/components/ui/input';
import UserWideCard from '@/components/UserWideCard';
import { Search as SearchIcon } from 'lucide-react';
import React from 'react';
interface Props {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
}
const UserIndex = ({ users, title }: { users: Props[]; title: string }) => {
    const [usrs, setUsrs] = React.useState(() => users);
    const [searchTerm, setSearchTerm] = React.useState('');
    // --------------- FILTER THE USERS HERE -----------------------
    Search({ users: users, setUsers: setUsrs, searchTerm: searchTerm });

    return (
        <div className="bg-white pt-8 dark:bg-gray-900">
            <div className="mx-auto mb-4 max-w-5xl">
                <div className="relative mb-3 rounded-sm border border-blue-500/50">
                    <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                    <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="h-12 w-full rounded-sm px-3 pl-10 dark:bg-gray-950 dark:text-white"
                        placeholder={`Search ${title?.slice(0, title.length - 1)}`}
                        tabIndex={1}
                    />
                </div>
                <div className="mx-auto max-w-5xl rounded-md border-2 bg-[#f1f4fa] p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <h1 className="p-8 text-center text-3xl font-semibold">All {title}</h1>
                    <div className="min-h-screen pb-12">
                        {usrs.map((user, ind) => (
                            <UserWideCard key={ind} user={user} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserIndex;
