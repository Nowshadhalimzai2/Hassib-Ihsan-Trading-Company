import FlashMessage from '@/components/builtIn/FlashMessage';
import TransactionRecordList from '@/components/Transactions/TransactionRecordList';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Transaction } from '@/types';
import { Head, usePage } from '@inertiajs/react';

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
    const message = usePage().props.flash as { success: string };

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
            <section className="bg-white">
                <div title="#04" className="border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden border md:min-h-min">
                    <div className="p-1">
                        <FlashMessage message={message} duration={3000} />
                    </div>
                    <TransactionRecordList className="mt-6 px-3" transactions={transactions} />
                </div>
            </section>
        </AppLayout>
    );
};

export default Index;
