import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User as UserType } from '@/types';
import { Link } from '@inertiajs/react';
import { Delete, Edit, User } from 'lucide-react';
import React from 'react';

type TabButtonProps = { activeTab: string; setActiveTab: React.Dispatch<React.SetStateAction<string>>; activeOrHover: string; notActveOrHover: string,tabItem:string };


const ShowCustomer = ({ customer }: { customer: UserType }) => {
    const breadcrumbs: BreadcrumbItem[] = [
    {
         title: 'Register User',
        href: '/admin/register-user',
    },
      {
         title: 'Customers',
        href: '/admin/customers',
    },
     {
         title: 'Customer',
        href: '/admin/customers/'+customer.id,
    },
];
    const [activeTab, setActiveTab] = React.useState<string>('Orders');
    const [activeOrHover, notActveOrHover] = [`text-white font-semibold border-white bg-accent-foreground`, `border-blue-500 text-blue-500`];
    const tabItems = ['Orders', 'Payments', 'Informations'];
    const tabs=tabItems.map((tabItem,ind)=><TabButton activeOrHover={activeOrHover} activeTab={activeTab} notActveOrHover={notActveOrHover} setActiveTab={setActiveTab} tabItem={tabItem} key={ind}/>)
    const orders=customer.orders.map((order, ind) => {
                        return (
                            <Link
                                href={route('admin.customer.order', [customer.id,order.id])}
                                key={ind}
                                className="r flex w-full items-center justify-evenly rounded-lg border border-blue-400 px-3 py-4"
                            >
                                <p>{order.id}</p>
                                <p>{new Date(order.order_date).toLocaleString().split(',')[0]}</p>
                                <p>{order.total_amount}</p>
                                <p>{order.status}</p>
                                <p>{order.delivery_address}</p>
                            </Link>
                        );
                    });
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
          <div className="relative z-10 min-h-screen pt-8 dark:bg-gray-900">
            <div className="bg-accent z-100 mx-auto max-w-4xl rounded-md border p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <h1 className="p-8 text-center text-3xl font-semibold text-lime-500">Customer Details</h1>
                <div className="divide-y px-4">
                    <div className="Profile flex flex-col items-center justify-center pb-8">
                        {/* <img src="" alt="" className="object-cover rounded-full border-2 p-3" /> */}
                        <User className="size-16 rounded-full border-2 border-slate-900 p-1 md:size-20" />
                        <p className="px-2 py-3 font-serif text-lime-400">{customer.name}</p>
                        <p className="px-2 text-gray-400">{customer.email}</p>
                        <p className="px-2 text-gray-400">{customer.phone}</p>
                    </div>

                    {/* =================== DELETE AND UPDATE SECTIONS ==================== */}
                    <UserMinupulation id={customer.id} />
                </div>
            </div>

            <section className="History absolute top-70 -z-10 w-full rounded-lg border bg-blue-50 p-6 pt-35">
                <div className="flex items-center justify-center gap-x-3">
                    {tabs}
                </div>
                <div className="Records my-6">
                    {activeTab==='Orders' && orders}
                    {activeTab==='Payments' && <div>Payments</div>}
                    {activeTab==='Informations' &&
                     (<div>
                        <div>
                            <div className="Address px-6 py-4 rounded-sm bg-accent-foreground text-white">
                                <p>Physical Address: {customer.address}</p>
                                <p>Phone Number: {'0770300332'}</p>
                                <p>Number of overall orders: {customer.orders.length}</p>
                            </div>
                        </div>
                    </div>)}

                </div>
            </section>
        </div>
      </AppLayout>
    );
};

// 000000000000000000000000000000000000000 Here the user deletation and edition occures;0000000000000000000000000000000000000000
const UserMinupulation = ({ id }: { id: number }) => {
    return (
        <section className="DeleteUpdateSection flex justify-end">
            <a
                href="" //{route('admin.customer.edit', customer.id)}
                className="mt-4 mr-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
                <Edit className="mr-2 inline-block" />
            </a>
            <form
                method="POST"
                action={route('admin.customer.delete', id)}
                onSubmit={(e) => {
                    if (!confirm('Are you sure you want to delete this customer?')) {
                        e.preventDefault();
                    }
                }}
            >
                <input type="hidden" name="_method" value="DELETE" />
                <button type="submit" className="mt-4 inline-block rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                    <Delete className="mr-2 inline-block" />
                </button>
            </form>
        </section>
    );
};

const TabButton = ({ activeTab, setActiveTab, activeOrHover, notActveOrHover,tabItem }: TabButtonProps) => {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                setActiveTab(tabItem);
            }}
            className={`rounded-lg border px-4 py-2 ${activeTab === tabItem ? activeOrHover : notActveOrHover}`}
        >
            {tabItem}
        </button>
    );
};
export default ShowCustomer;
