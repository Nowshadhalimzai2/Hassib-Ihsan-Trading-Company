import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import React, { FormEventHandler } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Register User',
        href: '/admin/register-user',
    },
];
interface RoleProps {
    roles: { name: string }[];
}
const RegisterUser = ({ roles }: RoleProps) => {
    const [active, setActive] = React.useState<string>(localStorage.getItem('active') || '' || roles[0].name);
    const handleTabClick = (tab: string) => {
        setActive(tab);
        localStorage.setItem('active', tab);
    };
    const props = usePage().props as { flash?: { success?: string } };
    const success = props.flash?.success;

    const registerationTabs = roles.map((role) => {
        return (
            <button
                onClick={() => handleTabClick(role.name)}
                className={`${active === role.name ? 'py-0 text-sm text-black' : 'py-3 text-[12px] text-slate-600'} font-medium hover:text-black dark:text-slate-300 dark:hover:text-white`}
            >
                {role.name.toUpperCase()}
            </button>
        );
    });
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Register User" />
                {/* ===============  USERS TAB BAR     =============== */}
                <div className="flex space-x-3 bg-slate-100 px-4 dark:bg-slate-800">
                    <div className="flex w-full items-center justify-evenly space-x-2">{registerationTabs}</div>
                </div>
                {/* ===============  END USERS TAB BAR  ============== */}
                {success && <div className="my-4 rounded-lg bg-green-100 p-4 text-green-800">{success}</div>}

                {/* <UserForm userType={active} /> */}
                <UserForm userType={active} />
            </AppLayout>
        </>
    );
};

const UserForm = ({ userType }: { userType: string }) => {
    return (
        <div className="rounded-lg bg-slate-100 p-6 md:m-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex justify-center py-6 md:justify-end md:py-0">
                <a
                    href={`/admin/all-${userType}s`}
                    className="rounded-sm border border-white px-3 py-2 hover:bg-gray-950 hover:shadow hover:shadow-white"
                >
                    List of {userType}s
                </a>
            </div>
            <div>
                <h2 className="mb-8 text-center text-2xl font-semibold">Create {userType?.charAt(0).toUpperCase() + userType?.slice(1)}</h2>
                {/* Add your form fields here based on userType */}
                {userType === 'customer' && <CustomerForm />}
                {userType === 'employee' && <EmployeeForm />}
                {userType === 'investor' && <InvestorForm />}
                {userType === 'teller' && <TellerForm />}
                {userType === 'vendor' && <VendorForm />}
            </div>
        </div>
    );
};

type RegisterFormType = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    password_confirmation: string;
};
type ExmployeeFormType = RegisterFormType & {
    salary: number;
};
type FormType = RegisterFormType & {
    company: string;
};

const CustomerForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<FormType>>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: '',
        company: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register-customer'), {
            onFinish: () => reset('password', 'password_confirmation', 'first_name', 'last_name', 'email', 'phone', 'address', 'company'),
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
                                placeholder="First Name"
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
                                placeholder="Last Name"
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
                            <Label htmlFor="password">Shop Name</Label>
                            <Input
                                id="company"
                                type="text"
                                tabIndex={6}
                                autoComplete="company"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                                disabled={processing}
                                placeholder="company  or shop name"
                            />
                            <InputError message={errors.company} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={6}
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
                                tabIndex={7}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button type="submit" className="mt-2 w-full" tabIndex={8} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create account
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
const EmployeeForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ExmployeeFormType>>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: '',
        salary: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register-employee'), {
            onFinish: () => reset('password', 'password_confirmation', 'first_name', 'last_name', 'email', 'phone', 'address', 'salary'),
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
                                placeholder="First Name"
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
                                placeholder="Last Name"
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
                            <Label htmlFor="password">Salary</Label>
                            <Input
                                id="salary"
                                type="number"
                                required
                                tabIndex={6}
                                autoComplete="salary"
                                value={data.salary}
                                onChange={(e) => setData('salary', Number(e.target.value))}
                                disabled={processing}
                                placeholder="Afg Salary ex: 12000"
                            />
                            <InputError message={errors.salary} />
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

type InvestorFormType = RegisterFormType & {
    profit_percentage: number | null;
};
const InvestorForm = () => {
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

const TellerForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<FormType>>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: '',
        company: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register-teller'), {
            onFinish: () => reset('password', 'password_confirmation', 'first_name', 'last_name', 'email', 'phone', 'address', 'company'),
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
                            <Label htmlFor="password">Company Name</Label>
                            <Input
                                id="company"
                                type="text"
                                required
                                tabIndex={6}
                                autoComplete="company"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                                disabled={processing}
                                placeholder="company  or shop name"
                            />
                            <InputError message={errors.company} />
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

const VendorForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<FormType>>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: '',
        company: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register-vendor'), {
            onFinish: () => reset('password', 'password_confirmation', 'first_name', 'last_name', 'email', 'phone', 'address', 'company'),
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
                            <Label htmlFor="password">Company Name</Label>
                            <Input
                                id="company"
                                type="text"
                                required
                                tabIndex={6}
                                autoComplete="company"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                                disabled={processing}
                                placeholder="company  or shop name"
                            />
                            <InputError message={errors.company} />
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

export default RegisterUser;
