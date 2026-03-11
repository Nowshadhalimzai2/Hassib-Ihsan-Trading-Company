import { Delete, Edit, User } from 'lucide-react';

interface ShowCustomerProps {
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        id: number;
    };
}

const ShowCustomer = ({ customer }: ShowCustomerProps) => {
    return (
        <div className="relative z-10 min-h-screen pt-8 dark:bg-gray-900">
            <div className="z-100 mx-auto max-w-4xl rounded-md border border-white bg-lime-200 p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <h1 className="p-8 text-center text-3xl font-semibold text-lime-500">Customer Details</h1>
                <div className="divide-y px-4">
                    <div className="Profile flex flex-col items-center justify-center pb-8">
                        {/* <img src="" alt="" className="object-cover rounded-full border-2 p-3" /> */}
                        <User className="size-16 rounded-full border-2 border-slate-900 p-1 md:size-20" />
                        <p className="px-2 py-3 font-serif text-lime-400">{customer.name}</p>
                        <p className="px-2 text-gray-400">{customer.email}</p>
                        <p className="px-2 text-gray-400">{customer.phone}</p>
                    </div>

                    {/* =================== DELETE AND UPDATE SECTIONS ==================== */}
                    <UserMinupulation id={customer.id} />
                </div>
            </div>

            <section className="History absolute top-70 -z-10 w-full rounded-lg border bg-lime-100 p-6 pt-35">
                <div className="flex items-center justify-center gap-x-3">
                    <div className="rounded-lg border border-blue-500 px-4 py-2 text-blue-500">Orders </div>
                    <div className="rounded-lg border border-blue-500 px-4 py-2 text-blue-500">Payments </div>
                    <div className="rounded-lg border border-blue-500 px-4 py-2 text-blue-500">Information </div>
                </div>
            </section>
        </div>
    );
};

// 000000000000000000000000000000000000000 Here the user deletation and edition occures;0000000000000000000000000000000000000000
const UserMinupulation = ({ id }: { id: number }) => {
    return (
        <section className="DeleteUpdateSection flex justify-end">
            <a
                href="" //{route('admin.customer.edit', customer.id)}
                className="mt-4 mr-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
                <Edit className="mr-2 inline-block" />
            </a>
            <form
                method="POST"
                action={route('admin.customer.delete', id)}
                onSubmit={(e) => {
                    if (!confirm('Are you sure you want to delete this customer?')) {
                        e.preventDefault();
                    }
                }}
            >
                <input type="hidden" name="_method" value="DELETE" />
                <button type="submit" className="mt-4 inline-block rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                    <Delete className="mr-2 inline-block" />
                </button>
            </form>
        </section>
    );
};

export default ShowCustomer;
