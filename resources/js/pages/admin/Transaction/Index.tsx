import TransactionRecordList from '@/components/Transactions/TransactionRecordList';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Transaction } from '@/types';
import { Head } from '@inertiajs/react';

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

const Index = ({ transactions }: TransactionProps) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="transactions" />

            {/* ============   TRANSACTION Create Button  ============== */}
            <div className="flex justify-end py-6">
                <a
                    href={route('transactions.create')}
                    className="rounded-md bg-white/20 px-4 py-2 text-end text-lg font-bold duration-300 hover:bg-white/10"
                >
                    New Transaction
                </a>
            </div>
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

export default Index;
