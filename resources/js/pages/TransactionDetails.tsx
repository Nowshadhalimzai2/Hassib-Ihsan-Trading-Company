import { Transaction } from '@/types';
import { DollarSign } from 'lucide-react';
interface UserTransaction extends Transaction {
    source: { name: string };
    destination: { name: string };
}
const TransactionDetails = ({ transaction }: { transaction: UserTransaction }) => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-blue-50 p-4 dark:bg-gray-800">
            <div className="mx-auto max-w-3xl rounded-md border border-white py-6 px-6 md:px-24 shadow-lg shadow-white dark:bg-gray-900">
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
            </div>
        </div>
    );
};

export default TransactionDetails;
