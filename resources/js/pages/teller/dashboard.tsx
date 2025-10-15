import TransactionRecordList from '@/components/Transactions/TransactionRecordList';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teller',
        href: '/teller/dashboard',
    },
];

export default function Dashboard() {
    const auth_user = usePage().props.auth as { user: { id: number; name: string } };
    const currencies = usePage().props.sumByCurrency as { Afg: number; Pak?: number; USD?: number };
    const user = usePage().props.user as User;
    const transactions = [...(user.transactions_as_source || []), ...(user.transactions_as_destination || [])];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Investor Transactions" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div
                        title="#01"
                        className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-blue-50 pt-6 duration-300 hover:scale-103 hover:bg-blue-100 hover:shadow-lg"
                    >
                        <h2 className="my-2 text-center text-2xl font-semibold">Balance Afg</h2>
                        <p className="text-center text-xl font-semibold">{currencies.Afg ? currencies.Afg : 0}</p>
                    </div>

                    <div
                        title="#02"
                        className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-yellow-50 pt-6 duration-300 hover:scale-103 hover:bg-yellow-100 hover:shadow-lg"
                    >
                        <h2 className="my-2 text-center text-2xl font-semibold">Balance Pak</h2>
                        <p className="text-center text-xl font-semibold">{currencies.Pak ? currencies.Pak : 0}</p>
                    </div>
                    <div
                        title="#03"
                        className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-cyan-50 pt-6 duration-300 hover:scale-103 hover:bg-cyan-100 hover:shadow-lg"
                    >
                        <h2 className="my-2 text-center text-2xl font-semibold">Balance USD</h2>
                        <p className="text-center text-xl font-semibold">{currencies.USD ? currencies.USD : 0}</p>
                    </div>
                </div>

                <div
                    title="#04"
                    className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min"
                >
                    <TransactionRecordList auth_user={auth_user.user} className="mt-6" transactions={transactions} />
                </div>
            </div>
        </AppLayout>
    );
}
