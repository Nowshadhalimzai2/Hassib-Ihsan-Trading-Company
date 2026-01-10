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
}
const AllCustomers = () => {
    const [customers, setCustomers] = React.useState(usePage().props.customers as Props[]);
    const allCustomer = usePage().props.customers as Props[];
    // Search functionality based on name or phone number
    const [searchTerm, setSearchTerm] = React.useState('');
    React.useEffect(() => {
        if (searchTerm === '') {
            setCustomers(allCustomer);
        } else {
            const filteredCustomers = allCustomer.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setCustomers(filteredCustomers);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    return (
        <div className="pt-8 dark:bg-gray-900">
            <div className="mx-auto mb-4 max-w-5xl">
                <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                    <Input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="h-12 w-full rounded-sm bg-gray-950 px-3 pl-10"
                        placeholder="Search Customer"
                        tabIndex={1}
                    />
                </div>
                <div className="mx-auto max-w-5xl rounded-md border border-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <h1 className="p-8 text-center text-3xl">All Customers</h1>
                    {customers.map((customer) => (
                        <a
                            href={route('admin.customers.show', customer.id)}
                            key={customer.id}
                            className="block border-b p-4 shadow hover:shadow-white dark:border-gray-700 dark:hover:bg-gray-900"
                        >
                            <h2 className="text-xl font-semibold">{customer.name}</h2>
                            <p className="text-gray-600">{customer.email}</p>
                            <p className="text-gray-600">{customer.phone}</p>

                            {/* <p className="text-gray-600">{customer.address}</p> */}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllCustomers;
