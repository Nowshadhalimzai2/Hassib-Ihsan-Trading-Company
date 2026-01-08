import TransactionTypes from '@/components/builtIn/TransactionTypes';
import T2B from '@/components/Transactions/T2B';
import T2V from '@/components/Transactions/T2V';
import TransactionRecordList from '@/components/Transactions/TransactionRecordList';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Transaction } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import B2T from '../../components/Transactions/B2T';
import B2V from '../../components/Transactions/B2V';
import V2B from '../../components/Transactions/V2B';
import V2T from '../../components/Transactions/V2T';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/admin/transactions',
    },
];
interface TransactionProps {
    transactions: Transaction[];
    users: User[];
}

interface User {
    id: number;
    name: string;
    role: { id: number; name: string };
}

const Transactions = ({ transactions, users }: TransactionProps) => {
    const [activeTTab, setActiveTTab] = React.useState(localStorage.getItem('activeTTab'));
    const handleTabClick = (tab: string) => {
        setActiveTTab(tab);
        localStorage.setItem('activeTTab', tab);
    };

    const registerationTabs = TransactionTypes.map((tType) => {
        return (
            <button
                onClick={() => handleTabClick(tType.name)}
                key={tType.id}
                className={`${activeTTab === tType.name ? 'bg-slate-900 text-sm text-white' : 'text-[12px] text-slate-200'} w-full rounded-sm bg-slate-700 px-3 py-2 font-medium hover:bg-slate-900 hover:text-white dark:text-slate-300 dark:hover:text-white`}
            >
                {tType.name.toUpperCase()}
            </button>
        );
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="transactions" />
            <h1 className="text-center text-2xl font-semibold text-gray-900 dark:text-white">Transactions</h1>
            {/* ============   TRANSACTION TABS  ============== */}
            <section className="">
                <div className="Tabs my-6 flex items-center justify-evenly">{registerationTabs}</div>
                <div>
                    <TransactionForm transactionType={activeTTab} users={users} />
                </div>
            </section>

            {/* Transaction List */}
            <section>
                <div
                    title="#04"
                    className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min"
                >
                    <TransactionRecordList className="mt-6" transactions={transactions} />
                </div>
            </section>
        </AppLayout>
    );
};

const TransactionForm = ({ transactionType, users }: { transactionType: string | null; users: User[] }) => {
    return (
        <div className="rounded-lg bg-slate-100 p-6 md:m-4 dark:border-gray-700 dark:bg-gray-800">
            {/* Add your form fields here based on transactionType */}

            {transactionType === 'B2T' && <B2T tellers={users['teller']} />}
            {transactionType === 'B2V' && <B2V vendors={users['vendor']} />}
            {transactionType === 'T2B' && <T2B tellers={users['teller']} />}
            {transactionType === 'T2V' && <T2V tellers={users['teller']} vendors={users['vendor']} />}
            {transactionType === 'V2B' && <V2B vendors={users['vendor']} />}
            {transactionType === 'V2T' && <V2T tellers={users['teller']} vendors={users['vendor']} />}
        </div>
    );
};

export default Transactions;
