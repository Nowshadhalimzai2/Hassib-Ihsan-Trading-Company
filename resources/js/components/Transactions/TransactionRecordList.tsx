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
    let minNoteLength: number | undefined = transactions[0] && transactions[0].notes?.length;
    transactions.forEach((transaction) => {
        if (minNoteLength && transaction.notes && minNoteLength > transaction?.notes.length) minNoteLength = transaction.notes?.length;
    });
    const transaction_records = transactions.map((transaction, index) => (
        <TransactionRecord key={index} auth_user={auth_user} minNoteLength={minNoteLength} transaction={transaction} />
    ));

    return (
        <>
            <div className={`${className}`} title="Transaction Record List">
                <div className="my-12 flex items-center justify-center space-x-3">
                    <Clock className="font-semibold"></Clock>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Transactions History</h2>
                </div>
                <div className="HeadNames mx-2 mb-2 flex justify-between px-2 text-lg font-bold text-gray-600 dark:text-white/80">
                    <span>Amount</span>
                    <span>Currency</span>
                    <span>Note</span>
                    <span>Date</span>
                </div>
                <div className="ListItems">{transaction_records && transaction_records}</div>
            </div>
        </>
    );
};

export const TransactionRecord = ({
    transaction,
    minNoteLength,
    auth_user,
}: {
    transaction: Transaction;
    minNoteLength?: number;
    auth_user?: { id: number; name: string };
}) => {
    return (
        <>
            <a href={route('admin.transaction.show', transaction.id)} className="">
                <div
                    className={`mx-2 mt-1 flex w-full justify-between rounded-sm border-transparent px-4 py-3 transition-all duration-300 hover:scale-101 hover:border hover:border-white hover:shadow-lg`}
                >
                    <span>
                        {transaction.business_account_id === 1 || auth_user?.id === transaction.source_id ? (
                            <ArrowDown className="text-green-500" />
                        ) : (
                            <ArrowUp className="text-red-500" />
                        )}
                        {transaction.amount}
                    </span>
                    <span>{transaction.currency_id == 1 ? 'Afg' : transaction.currency_id == 2 ? 'Pak' : 'USD'}</span>
                    <span>...{transaction?.notes?.slice(0, minNoteLength)}</span>
                    <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
                </div>
            </a>
        </>
    );
};

export default TransactionRecordList;
