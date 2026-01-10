import { Delete, Edit } from 'lucide-react';

interface Props {
    employee: {
        name: string;
        email: string;
        phone: string;
        address: string;
        id: number;
        salary?: number;
    };
}

const ShowEmployee = ({ employee }: Props) => {
    return (
        <div className="min-h-screen pt-8 dark:bg-gray-900">
            <div className="mx-auto mb-4 max-w-5xl rounded-md border border-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <h1 className="p-8 text-center text-3xl">Employee Details</h1>
                <div className="block border-b p-4 shadow hover:shadow-white dark:border-gray-700 dark:hover:bg-gray-900">
                    <h2 className="text-xl font-semibold">{employee.name}</h2>
                    <p className="text-gray-600">Email: {employee.email}</p>
                    <p className="text-gray-600">Phone: {employee.phone}</p>
                    <p className="text-gray-600">Address: {employee.address}</p>
                    <p className="text-gray-600">{employee.salary && `Salary: ${employee.salary}`}</p>
                </div>
                <section className="DeleteUpdateSection flex justify-end">
                    <a
                        href="" //{route('admin.customer.edit', customer.id)}
                        className="mt-4 mr-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        <Edit className="mr-2 inline-block" />
                    </a>
                    <form
                        method="POST"
                        action={route('admin.employee.delete', employee.id)}
                        onSubmit={(e) => {
                            if (!confirm('Are you sure you want to delete this employee?')) {
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
            </div>
        </div>
    );
};

export default ShowEmployee;
