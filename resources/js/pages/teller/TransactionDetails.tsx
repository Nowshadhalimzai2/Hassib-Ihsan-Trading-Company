import { Transaction } from '@/types';

const TransactionDetails = ({ transaction }: { transaction: Transaction }) => {
    return (
        <div>
            <h2>Transaction Details</h2>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {new Date(transaction.created_at).toLocaleDateString()}</p>
            <p>{transaction?.notes}</p>
            <p>{transaction.currency_id == 1 ? 'Afg' : transaction.currency_id == 2 ? 'Pak' : 'USD'}</p>
        </div>
    );
};

export default TransactionDetails;
