import SectionTitle from '@/components/SectionTitle';
import B2T from '@/components/Transactions/B2T';
import B2V from '@/components/Transactions/B2V';
import T2B from '@/components/Transactions/T2B';
import T2V from '@/components/Transactions/T2V';
import V2B from '@/components/Transactions/V2B';
import V2T from '@/components/Transactions/V2T';
import { DealingEntity, Transaction, User } from '@/types';

interface Props {
    users: User[];
    transaction: Transaction;
    entities: DealingEntity[];
}

const Edit = ({ transaction, users, entities }: Props) => {
    let TransactionForm: React.ReactNode | null = null;
    if (transaction.dealing_entity?.name === 'B2T')
        TransactionForm = <B2T tellers={users['teller']} transaction={transaction} dealing_entity={entities.filter((en) => en.name === 'B2T')[0]} />;
    else if (transaction.dealing_entity?.name === 'B2V')
        TransactionForm = <B2V vendors={users['vendor']} transaction={transaction} dealing_entity={entities.filter((en) => en.name === 'B2V')[0]} />;
    else if (transaction.dealing_entity?.name === 'T2B')
        TransactionForm = <T2B tellers={users['teller']} transaction={transaction} dealing_entity={entities.filter((en) => en.name === 'B2T')[0]} />;
    else if (transaction.dealing_entity?.name === 'T2V')
        TransactionForm = (
            <T2V
                vendors={users['vendor']}
                tellers={users['teller']}
                transaction={transaction}
                dealing_entity={entities.filter((en) => en.name === 'T2V')[0]}
            />
        );
    else if (transaction.dealing_entity?.name === 'V2B')
        TransactionForm = <V2B vendors={users['vendor']} transaction={transaction} dealing_entity={entities.filter((en) => en.name === 'V2B')[0]} />;
    else if (transaction.dealing_entity?.name === 'V2T')
        TransactionForm = (
            <V2T
                tellers={users['teller']}
                vendors={users['vendor']}
                transaction={transaction}
                dealing_entity={entities.filter((en) => en.name === 'V2T')[0]}
            />
        );
    else TransactionForm = <h1>Investor Form</h1>;

    return (
        <>
            <SectionTitle title="Edit Vendor" />
            <div className="flex h-screen items-center justify-center bg-slate-800">{TransactionForm}</div>
        </>
    );
};

export default Edit;
