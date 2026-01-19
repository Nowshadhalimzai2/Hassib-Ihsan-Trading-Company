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
    company: string;
}
const AllVendors = () => {
    const [vendors, setVendors] = React.useState(usePage().props.vendors as Props[]);
    console.log(usePage().props);

    const allVendors = usePage().props.vendors as Props[];
    // Search functionality based on name or phone number
    const [searchTerm, setSearchTerm] = React.useState('');
    React.useEffect(() => {
        if (searchTerm === '') {
            setVendors(allVendors);
        } else {
            const filteredVendors = allVendors.filter(
                (vendor) =>
                    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || vendor.phone.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setVendors(filteredVendors);
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
                        x
                        placeholder="Search Investor"
                        tabIndex={1}
                    />
                </div>
                <div className="mx-auto max-w-5xl rounded-md border border-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <h1 className="p-8 text-center text-3xl">All Vendors</h1>
                    {vendors.map((vendor) => (
                        <a
                            href={route('admin.vendor.show', vendor.id)}
                            key={vendor.id}
                            className="block border-b p-4 shadow hover:shadow-white dark:border-gray-700 dark:hover:bg-gray-900"
                        >
                            <h2 className="text-xl font-semibold">{vendor.name}</h2>
                            <p className="text-gray-600">{vendor.email}</p>
                            <p className="text-gray-600">{vendor.phone}</p>
                            <p className="text-gray-600">{vendor.company}</p>

                            {/* <p className="text-gray-600">{customer.address}</p> */}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllVendors;
