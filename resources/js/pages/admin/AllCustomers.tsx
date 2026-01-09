import { User } from '@/types';

const AllCustomers = (customers: User[]) => {
    return (
        // <div>
        //     <h1 className="text-3xl">All Customers</h1>
        //     {customers.map((customer) => (
        //         <div key={customer.id} className="border-b p-4">
        //             <h2 className="text-xl font-semibold">{customer.name}</h2>
        //             <p className="text-gray-600">{customer.email}</p>
        //         </div>
        //     ))}
        // </div>
    );
};

export default AllCustomers;
