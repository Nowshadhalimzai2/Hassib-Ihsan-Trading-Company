import { Transaction } from '@/types';
import { ArrowDown, ArrowUp, Clock } from 'lucide-react';

const TransactionRecordList = ({
    className,
    transactions,
    auth_user,
}: {
    className: string;
    transactions: Transaction[];
    auth_user?: { id: number; name: string };
}) => {
    const transaction_records = transactions.map((transaction, index) => (
        <TransactionRecord key={index} auth_user={auth_user} transaction={transaction} />
    ));

    return (
        <>
            <div className={`${className}`} title="Transaction Record List">
                <div className="my-12 flex items-center justify-center space-x-3">
                    <Clock className="font-semibold"></Clock>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Transactions History</h2>
                </div>
                <div className="HeadNames mx-2 mb-2 flex justify-between px-2 text-lg font-bold text-gray-600 dark:text-white/80">
                    <span className="px-2 text-center">From</span>
                    <span className="px-2 text-center">To</span>
                    <span className="px-2 text-center">Amount</span>
                    <span className="px-2 text-center">Currency</span>
                    <span className="px-2 text-center">Date</span>
                </div>
                <div className="ListItems grid grid-cols-2 bg-white md:grid-cols-1">{transaction_records && transaction_records}</div>
            </div>
        </>
    );
};

export const TransactionRecord = ({ transaction, auth_user }: { transaction: Transaction; auth_user?: { id: number; name: string } }) => {
    return (
        <a href={'/admin/transactions/' + transaction.id} className="">
            <div
                className={`mx-2 mt-1 flex w-full flex-col items-center space-y-3 rounded-sm border border-gray-200 px-4 py-3 transition-all duration-300 hover:scale-101 hover:border hover:border-white hover:bg-pink-100 hover:shadow-lg md:flex-row md:justify-between md:space-y-0`}
            >
                <div className="flex w-full flex-col items-center justify-between md:w-1/3 md:flex-row">
                    <span>
                        {transaction.business_account_id || auth_user?.id === transaction.source_id ? (
                            <ArrowDown className="inline text-green-500 md:block" />
                        ) : (
                            <ArrowUp className="inline text-red-500 md:block" />
                        )}
                        {transaction.source ? transaction.source?.name : 'Account'}
                    </span>
                    <span>{transaction.destination ? transaction.destination?.name : 'Account'}</span>
                </div>
                <div className="flex w-full justify-center space-x-2 md:w-1/3 md:justify-between">
                    <span>{transaction.amount}</span>
                    <span>{transaction.currency_id == 1 ? 'Afg' : transaction.currency_id == 2 ? 'Pak' : 'USD'}</span>
                </div>
                <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
            </div>
        </a>
    );
};

export default TransactionRecordList;
