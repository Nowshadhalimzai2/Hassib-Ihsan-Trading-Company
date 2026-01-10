import InputError from '@/components/input-error';
import { InvestorFormType } from '@/components/types/UseRegisterationTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export const InvestorForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<InvestorFormType>>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: '',
        profit_percentage: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register-investor'), {
            onFinish: () => reset('password', 'password_confirmation', 'first_name', 'last_name', 'email', 'phone', 'address', 'profit_percentage'),
        });
    };
    return (
        <div className="mx-auto max-w-xl rounded-md border border-gray-700 bg-white shadow-md shadow-white dark:bg-gray-900">
            <form className="flex flex-col rounded-lg p-6" onSubmit={submit}>
                <div className="">
                    <div className="grid gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="password">First Name</Label>
                            <Input
                                id="first_name"
                                type="text"
                                required
                                tabIndex={1}
                                autoComplete="first-name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                disabled={processing}
                                placeholder="ex: Nowshad"
                            />
                            <InputError message={errors.first_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Last Name</Label>
                            <Input
                                id="last_name"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="last-name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                disabled={processing}
                                placeholder="ex: Halimzai"
                            />
                            <InputError message={errors.last_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={3}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Phone Number</Label>
                            <Input
                                id="phone"
                                type="text"
                                required
                                tabIndex={4}
                                autoComplete="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing}
                                placeholder="Phone Number"
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Address</Label>
                            <Input
                                id="address"
                                type="text"
                                required
                                tabIndex={5}
                                autoComplete="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                disabled={processing}
                                placeholder="Address"
                            />
                            <InputError message={errors.address} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Profit Percentage</Label>
                            <Input
                                id="profit_percentage"
                                type="number"
                                required
                                tabIndex={6}
                                autoComplete="profit_percentage"
                                value={data.profit_percentage ?? ''}
                                onChange={(e) => setData('profit_percentage', Number(e.target.value))}
                                disabled={processing}
                                placeholder="ex: 50"
                            />
                            <InputError message={errors.profit_percentage} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={7}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={8}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button type="submit" className="mt-2 w-full" tabIndex={9} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create account
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
