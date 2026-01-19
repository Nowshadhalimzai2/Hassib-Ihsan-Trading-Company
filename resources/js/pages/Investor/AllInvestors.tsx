import { Input } from '@/components/ui/input';
import { usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import React from 'react';

interface Props {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    profit_percentage: number;
}
const AllInvestors = () => {
    const [investors, setInvestors] = React.useState(usePage().props.investors as Props[]);
    console.log(usePage().props);

    const allInvestors = usePage().props.investors as Props[];
    // Search functionality based on name or phone number
    const [searchTerm, setSearchTerm] = React.useState('');
    React.useEffect(() => {
        if (searchTerm === '') {
            setInvestors(allInvestors);
        } else {
            const filteredInvestors = allInvestors.filter(
                (investor) =>
                    investor.name.toLowerCase().includes(searchTerm.toLowerCase()) || investor.phone.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setInvestors(filteredInvestors);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    return (
        <div className="min-h-screen pt-8 dark:bg-gray-900">
            <div className="mx-auto mb-4 max-w-5xl">
                <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                    <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="h-12 w-full rounded-sm px-3 pl-10 dark:bg-gray-950 dark:text-white"
                        placeholder="Search Investor"
                        tabIndex={1}
                    />
                </div>
                <div className="mx-auto max-w-5xl rounded-md border border-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <h1 className="p-8 text-center text-3xl">All Investors</h1>
                    {investors.map((investor) => (
                        <a
                            href={route('admin.investor.show', investor.id)}
                            key={investor.id}
                            className="block border-b p-4 shadow hover:shadow-white dark:border-gray-700 dark:hover:bg-gray-900"
                        >
                            <h2 className="text-xl font-semibold">{investor.name}</h2>
                            <p className="text-gray-600">{investor.email}</p>
                            <p className="text-gray-600">{investor.phone}</p>
                            <p className="text-gray-600">{investor.profit_percentage}%</p>

                            {/* <p className="text-gray-600">{customer.address}</p> */}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllInvestors;
