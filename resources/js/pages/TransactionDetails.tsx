import { Transaction } from '@/types';

interface UserTransaction extends Transaction {
    source: { name: string };
    destination: { name: string };
}
const TransactionDetails = ({ transaction }: { transaction: UserTransaction }) => {
    return (
        <div className="m-6 mx-auto max-w-3xl bg-blue-50 p-4">
            <h2 className="mb-12 text-center text-2xl font-bold">Transaction Details</h2>
            <div className="flex justify-evenly">
                <div>
                    <span className="mr-2">Amount: {transaction.amount}</span>
                    <span>{transaction.currency_id == 1 ? 'Afg' : transaction.currency_id == 2 ? 'Pak' : 'USD'}</span>
                </div>
                <p>Date: {new Date(transaction.created_at).toLocaleDateString()}</p>
            </div>
            <div className="py-4">
                <span className="">
                    from : <span className="font-semibold italic">{transaction.source?.name ? transaction.source.name : ' Business Account'}</span>
                </span>
                <span className="">
                    {' '}
                    transferred to{' '}
                    <span className="font-semibold italic">{transaction.destination ? transaction.destination.name : ' Business Account'}</span>
                </span>
            </div>
            <p className="mt-2 flex justify-end bg-white p-4">{transaction?.notes}</p>
        </div>
    );
};

export default TransactionDetails;
