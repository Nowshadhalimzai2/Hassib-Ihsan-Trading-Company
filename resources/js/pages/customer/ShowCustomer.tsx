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
        <div className="min-h-screen pt-8 dark:bg-gray-900">
            <div className="mx-auto mb-4 max-w-5xl rounded-md border border-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <h1 className="p-8 text-center text-3xl">Customer Details</h1>
                <div className="block border-b p-4 shadow hover:shadow-white dark:border-gray-700 dark:hover:bg-gray-900">
                    <h2 className="text-xl font-semibold">{customer.name}</h2>
                    <p className="text-gray-600">Email: {customer.email}</p>
                    <p className="text-gray-600">Phone: {customer.phone}</p>
                    <p className="text-gray-600">Address: {customer.address}</p>
                </div>
                <section className="DeleteUpdateSection flex justify-end">
                    <a
                        href="#" //{route('admin.customers.edit', customer.id)}
                        className="mt-4 mr-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Edit Customer
                    </a>
                    <form
                        method="POST"
                        action={route('admin.customers.delete', customer.id)}
                        onSubmit={(e) => {
                            if (!confirm('Are you sure you want to delete this customer?')) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input type="hidden" name="_method" value="DELETE" />
                        <button type="submit" className="mt-4 inline-block rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                            Delete Customer
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default ShowCustomer;
