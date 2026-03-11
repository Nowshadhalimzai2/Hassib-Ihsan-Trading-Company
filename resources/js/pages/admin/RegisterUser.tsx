import { CustomerForm } from '@/components/admin/RegisterationForms/Customer';
import { EmployeeForm } from '@/components/admin/RegisterationForms/Employee';
import { InvestorForm } from '@/components/admin/RegisterationForms/Investor';
import { TellerForm } from '@/components/admin/RegisterationForms/Teller';
import { VendorForm } from '@/components/admin/RegisterationForms/Vendor';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

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
                className={`${active === role.name ? 'py-0 text-sm text-black dark:text-white' : 'py-3 text-[12px] text-slate-600'} font-medium hover:text-black dark:text-slate-300 dark:hover:text-white`}
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
        <div className="rounded-lg p-6 md:m-4 dark:border-gray-700 dark:bg-slate-900">
            <div className="flex justify-center py-6 md:justify-end md:py-0">
                <a
                    href={`/admin/all-${userType}s`}
                    className="rounded-sm border border-white px-3 py-2 hover:bg-gray-950 hover:text-white hover:shadow"
                >
                    List of {userType}s
                </a>
            </div>
            <div>
                <div className="mx-auto max-w-2xl">
                    <h2 className="mb-8 rounded-md border bg-white p-2 text-center text-2xl font-semibold shadow dark:bg-slate-900 dark:shadow-white">
                        Create {userType?.charAt(0).toUpperCase() + userType?.slice(1)}
                    </h2>
                </div>
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

export default RegisterUser;
