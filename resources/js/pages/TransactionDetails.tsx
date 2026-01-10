import { Transaction } from '@/types';
import { Delete, DollarSign, Edit } from 'lucide-react';
interface UserTransaction extends Transaction {
    source: { name: string };
    destination: { name: string };
}
const TransactionDetails = ({ transaction }: { transaction: UserTransaction }) => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-blue-50 p-4 dark:bg-gray-800">
            <div className="mx-auto max-w-4xl rounded-md border border-white px-6 py-6 shadow-lg shadow-white md:px-16 dark:bg-gray-900">
                <h2 className="mb-12 text-center text-2xl font-bold">Transaction Details</h2>
                <div className="py-4">
                    <span className="">
                        from :{' '}
                        <span className="font-semibold italic">{transaction.source?.name ? transaction.source.name : ' Business Account'}</span>
                    </span>
                    <span className="">
                        {' '}
                        transferred to{' '}
                        <span className="font-semibold italic">{transaction.destination ? transaction.destination.name : ' Business Account'}</span>
                    </span>
                </div>
                <div className="flex justify-evenly">
                    <div>
                        <span className="mr-2">
                            <DollarSign className="inline" /> {transaction.amount}
                        </span>
                        <span>{transaction.currency_id == 1 ? 'Afg' : transaction.currency_id == 2 ? 'Pak' : 'USD'}</span>
                    </div>
                    <p>Date: {new Date(transaction.created_at).toLocaleDateString()}</p>
                </div>
                <p className="mt-2 flex justify-end border border-white bg-white p-4 dark:bg-gray-800">{transaction?.notes}</p>

                {/*---------------------- Delete and Edit actions ----------------------- */}
                <section className="DeleteUpdateSection flex justify-end">
                    <a
                        href="#" //{route('admin.transaction.edit', transaction.id)}
                        className="mt-4 mr-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        <Edit className="mr-2 inline-block" />
                    </a>
                    <form
                        method="POST"
                        action={route('admin.transaction.delete', transaction.id)}
                        onSubmit={(e) => {
                            if (!confirm('Are you sure you want to delete the Transaction?')) {
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

export default TransactionDetails;
