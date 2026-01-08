import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Currency } from '@/types';
import { useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { User } from '../builtIn/TransactionTypes';
type RegisterFormType = {
    amount: string;
    currency_id: number;
    destination_id: number;
    source_id: number;
    notes: string;
};

const T2V = ({ tellers, vendors }: { tellers: User[]; vendors: User[] }) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterFormType>>({
        amount: '',
        currency_id: 1,
        destination_id: 0,
        source_id: 0,
        notes: '',
    });
    const currencies: Currency[] = [
        { id: 1, name: 'Afghani' },
        { id: 2, name: 'Pakistani' },
        { id: 3, name: 'Dollar' },
    ];
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('transaction.post'), {
            onFinish: () => reset('amount', 'currency_id', 'destination_id', 'notes', 'source_id'),
        });
    };
    const fieldStyle: string = 'rounded-sm p-2 ring ring-slate-700 hover:ring-2';
    return (
        <div className="mx-auto max-w-xl rounded-lg border border-white bg-white shadow-lg hover:shadow-white dark:bg-gray-800">
            <h2 className="p-4 text-center text-xl font-semibold text-slate-950 dark:text-white">Transaction From Teller to Vendor</h2>

            <form className="flex flex-col rounded-lg p-6" onSubmit={submit}>
                <div className="">
                    <div className="grid gap-2 space-y-2">
                        {/* ==========  SOURCE (Teller) FIELD  ============ */}
                        <div className="grid gap-1">
                            <Label htmlFor="source_id">From Teller</Label>
                            <select
                                tabIndex={1}
                                name="source_id"
                                id="source_id"
                                onChange={(e) => setData('source_id', Number(e.target.value))}
                                className={fieldStyle}
                            >
                                <option value="" className="text-gray-400">
                                    Select Teller...
                                </option>
                                {tellers.map((teller) => (
                                    <option key={teller.id} value={teller.id}>
                                        {teller.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.source_id} />
                        </div>

                        {/* ==========  DESTINATION (Vendor) FIELD  ============ */}
                        <div className="grid gap-1">
                            <Label htmlFor="destination_id">To Vendor</Label>
                            <select
                                tabIndex={1}
                                name="destination_id"
                                id="destination_id"
                                onChange={(e) => setData('destination_id', Number(e.target.value))}
                                className={fieldStyle}
                            >
                                <option value="" className="text-gray-400">
                                    Select Vendor...
                                </option>
                                {vendors.map((vendor) => (
                                    <option key={vendor.id} value={vendor.id}>
                                        {vendor.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.destination_id} />
                        </div>

                        {/* ==========  AMOUNT FIELD  ============ */}
                        <div className="grid gap-1">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="text"
                                required
                                tabIndex={2}
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                disabled={processing}
                                placeholder="Enter the amount"
                                className={fieldStyle}
                            />
                            <InputError message={errors.amount} />
                        </div>

                        {/* ==========  CURRENCY FIELD  ============ */}
                        <div className="grid gap-1">
                            <Label htmlFor="currecny">Currency</Label>
                            <select
                                tabIndex={3}
                                name="currency_id"
                                id="currency"
                                onChange={(e) => setData('currency_id', Number(e.target.value))}
                                className={fieldStyle}
                                disabled={processing}
                            >
                                {currencies.map((currency) => (
                                    <option key={currency.id} value={currency.id}>
                                        {currency.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.currency_id} />
                        </div>

                        {/* ==========  Notes FIELD  ============ */}
                        <div className="grid gap-1">
                            <Label htmlFor="notes">Amount</Label>
                            <textarea
                                id="notes"
                                tabIndex={4}
                                value={data.notes}
                                placeholder="write notes here..."
                                onChange={(e) => setData('notes', e.target.value)}
                                disabled={processing}
                                className={fieldStyle}
                            />
                            <InputError message={errors.notes} />
                        </div>

                        {/* ==========  SUBMIT BUTTON  ============ */}
                        <Button type="submit" className="mt-2 w-full" tabIndex={8} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default T2V;
