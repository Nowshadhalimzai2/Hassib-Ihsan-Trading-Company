import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Order } from '@/types';
import { router } from '@inertiajs/react';
import { Eye, SearchIcon } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Orders', href: '/admin/orders' }];
const Index = ({orders}:{orders: Order[]}) => {
    const handleAction=(orderId:number)=>{
        router.get(route('admin.orders.show', orderId));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>
                <div>
                    <h2 className="py-4 text-center text-lg font-bold md:text-2xl lg:text-3xl">Orders Received</h2>
                    <p className="pb-2 text-center text-gray-600">Here you can view all the orders that have been received.</p>
                </div>
                <div className='mt-10'>
                    <div className="w-full mx-5">
                        <div className="relative">
                            <SearchIcon className="absolute top-2.5 left-1 inline size-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="mx-auto w-full rounded-lg border px-8 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-1/2 lg:w-1/3"
                            />
                        </div>
                    </div>
                    <div className="mx-5 mt-5 overflow-x-auto">
                        <table className="w-full space-y-2 overflow-hidden rounded-xl bg-gray-200 py-2">
                            <thead className="rounded-t-xl bg-gray-400">
                                <tr className="gap-3 text-center">
                                    <th className="py-2">Order ID</th>
                                    <th className="py-2">Customer Name</th>
                                    <th className="py-2">Total Amount</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="w-full">
 
                               {orders.map((order,ind)=> <tr className="text-center" key={ind}>
                                    <td className="py-2">#{order.id}</td>
                                    <td className="py-2">{order.user.name}</td>
                                    <td className="py-2">{order.total_amount.toFixed(1)}</td>
                                    <td className="py-2">
                                        <span className={`rounded ${order.status==='pending' ? 'bg-amber-300' : (order.status==='cancelled' ? 'bg-red-300' : 'bg-green-300')} px-2 py-1.5 text-white`}>{order.status.toUpperCase()}</span>
                                    </td>
                                    <td className="py-2">
                                        <button className="rounded border hover:border-blue-500 px-3 py-1 hover:text-blue-500 text-white transition-colors duration-150 bg-blue-400 hover:bg-transparent" onClick={() => handleAction(order.id)}><Eye className=''/></button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
