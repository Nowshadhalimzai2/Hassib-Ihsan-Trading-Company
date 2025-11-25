import TransactionRecordList from '@/components/Transactions/TransactionRecordList';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Transaction } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/admin/transactions',
    },
];
interface TransactionProps {
    transactions: Transaction[];
    users: { id: number; name: string }[];
}
type RegisterForm = {
    amount: string;
    currency: string;
    source?: { id: number; name: string };
    destination?: { id: number; name: string };
    BA_as_source: boolean;
    BA_as_destination: boolean;
    notes?: string;
};

const Transactions = ({ transactions, users }: TransactionProps) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="transactions" />
            {/* Transaction Fields */}
            <section>
                <TransactionFields users={users} />
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

const TransactionFields = ({ users }: TransactionProps) => {
    const [isBAAsDestination, setIsBAAsDestination] = useState(false);
    const [isBAAsSource, setIsBAAsSource] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        amount: '',
        currency: '',
        source: { name: '', id: 0 },
        destination: { name: '', id: 0 },
        BA_as_source: false,
        BA_as_destination: false,
        notes: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('transaction.post'), {
            onFinish: () => reset('amount', 'notes', 'source', 'destination', 'BA_as_source', 'BA_as_destination'),
        });
    };
    return (
        <>
            <div className="mb-6">
                <h1 className="text-center text-2xl font-semibold text-gray-900 dark:text-white">Transactions</h1>
                <div className="">
                    <form className="flex flex-col gap-6 rounded-lg bg-white p-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    required
                                    tabIndex={1}
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    disabled={processing}
                                    placeholder="ex: 15000"
                                />
                                <InputError message={errors.amount} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="dealingEntity">Currency</Label>

                                <select
                                    id="dealingEntity"
                                    className="rounded-md border border-gray-300 p-[6px] focus:ring-2 focus:ring-gray-300"
                                    name="dealingEntity"
                                    tabIndex={2}
                                    disabled={processing}
                                >
                                    <option value="Afg" className="">
                                        Afghani
                                    </option>
                                    <option value="Pak">Pakistani</option>
                                    <option value="USD">Dollor</option>
                                </select>

                                <InputError message={errors.currency} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="business_account">Business Account</Label>

                                <fieldset>
                                    {!isBAAsDestination && (
                                        <div>
                                            <span>As Source</span>
                                            <Input
                                                id="business_account"
                                                type="checkbox"
                                                tabIndex={5}
                                                onChange={(e) => {
                                                    setData('BA_as_source', Boolean(e.target.value));
                                                    setIsBAAsSource((pre) => !pre);
                                                }}
                                                disabled={processing}
                                            />
                                        </div>
                                    )}
                                    {!isBAAsSource && (
                                        <div>
                                            <span>As Destination</span>
                                            <Input
                                                id="business_account"
                                                type="checkbox"
                                                tabIndex={6}
                                                onChange={(e) => {
                                                    setData('BA_as_destination', Boolean(e.target.value));
                                                    setIsBAAsDestination((pre) => !pre);
                                                }}
                                                disabled={processing}
                                            />
                                        </div>
                                    )}
                                </fieldset>
                                <InputError message={errors.BA_as_source || errors.BA_as_destination} className="mt-2" />
                            </div>

                            {!isBAAsSource && (
                                <div className="grid gap-2">
                                    <Label htmlFor="source">Source</Label>

                                    <select
                                        name="source"
                                        id="source"
                                        className="rounded-md border border-gray-300 p-[6px] focus:ring-2 focus:ring-gray-300"
                                        tabIndex={3}
                                        disabled={processing}
                                    >
                                        {users.map((user) => {
                                            return <option value={user.id}>{user.name}</option>;
                                        })}
                                    </select>

                                    <InputError message={errors.source} className="mt-2" />
                                </div>
                            )}
                            {!isBAAsDestination && (
                                <div className="grid gap-2">
                                    <Label htmlFor="destination">Destination</Label>

                                    <select
                                        name="destination"
                                        className="rounded-md border border-gray-300 p-[6px] focus:ring-2 focus:ring-gray-300"
                                        id="destination"
                                        tabIndex={4}
                                        disabled={processing}
                                    >
                                        {users.map((user) => {
                                            return <option value={user.id}>{user.name}</option>;
                                        })}
                                    </select>

                                    <InputError message={errors.destination} className="mt-2" />
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Input
                                    id="notes"
                                    type="text"
                                    required
                                    tabIndex={7}
                                    autoComplete="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    disabled={processing}
                                    placeholder="Notes..."
                                />
                                <InputError message={errors.notes} />
                            </div>

                            <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Transactions;
