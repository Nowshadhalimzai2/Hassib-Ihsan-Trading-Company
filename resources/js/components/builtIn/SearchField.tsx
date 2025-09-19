import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
const SearchField = () => {
    // const [searchTerm, setSearchTerm] = useState('');
    function handleSearchChange(search: string) {
        router.post(route('products.search'), {
            query: search,
        });
    }
    return (
        <div className="SearchField w-full md:w-1/4">
            <div className="flex items-center rounded-md border border-gray-300 bg-white/40 px-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <Search className="mr-2 text-[#1c3d3d] dark:text-lime-400" />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-md bg-transparent p-2 outline-none dark:border-gray-700 dark:bg-transparent dark:text-white"
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchField;
