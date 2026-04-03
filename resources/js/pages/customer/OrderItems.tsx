import ItemList from '@/components/products/ItemList';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Order, User as UserType } from '@/types';
import { ChartArea, Check, Clock, MapPin, MessageCircleWarningIcon, Phone, ShoppingBasket, User } from 'lucide-react';

const OrderItems = ({ customer, order }: { customer: UserType; order: Order }) => {
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
            href: '/admin/customers/' + customer.id,
        },
        {
            title: 'Order Items',
            href: '/admin/customers/' + customer.id + '/orders/' + order.id,
        },
    ];
    const [date, time] = new Date(order.order_date).toLocaleString().split(',');
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="bg-accent min-h-screen pt-10 pb-20">
                <div className="mx-auto flex max-w-4xl flex-col items-center overflow-x-auto rounded-lg border bg-[#f1f7fa] pt-6 shadow">
                    <div className="flex items-center gap-2 p-3 text-3xl font-bold">
                        {order.status === 'pending' && (
                            <div title="The Customer is still waiting for Order to receive">
                                <MessageCircleWarningIcon className="size-10 text-yellow-500" />
                            </div>
                        )}
                        Order #{order.id}
                    </div>
                    <div className="CUSTOMERINFO w-full border-b p-4">
                        <div className="flex items-center justify-center gap-3 pb-8">
                            <div>
                                <User className="size-12 rounded-full border" />
                            </div>
                            <h4 className="text-lg font-semibold">{customer.name}</h4>
                        </div>
                        <div className="flex items-center justify-evenly">
                            <div className="ContactInfo text-center font-serif font-semibold">
                                {customer.phone ? (
                                    <div className="flex items-center gap-2">
                                        <span>
                                            <Phone />
                                        </span>
                                        <span>{customer.phone}</span>
                                    </div>
                                ) : (
                                    'No Phone Number'
                                )}
                            </div>
                            <div className="Address flex items-center justify-end text-blue-300">
                                <span>
                                    <MapPin />
                                </span>
                                <span>{order.delivery_address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="ORDERINFO flex w-full items-center justify-between border-b p-6 px-8 md:px-10 lg:px-12">
                        <div className="text-xl font-semibold text-gray-500">
                            <div>
                                {' '}
                                Total:
                                <span className="mx-1 text-lg text-blue-400">{order.total_amount}</span>
                                <span>{order.currency_id == 1 ? 'AFG' : order.currency_id == 2 ? 'PAK' : 'USD'}</span>
                            </div>
                            <div className="flex gap-2">
                                <ShoppingBasket />
                                Items count: <span className="text-blue-500">{order.order_items.length}</span>
                            </div>
                            <div className={`flex gap-2 ${order.status == 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                                <ChartArea />
                                {order.status.toUpperCase()}
                            </div>
                        </div>
                        <div className="Date flex flex-col items-center gap-2 rounded-lg p-2 text-blue-400">
                            <div className="flex items-center justify-center gap-2">
                                <div>
                                    <Clock className="text-gray-500" />
                                </div>
                                <div>
                                    <p>{date}</p>
                                    <p className="">{time}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-10">
                                <span className="flex text-gray-500">
                                    <Phone />
                                </span>
                                <span>
                                    {order.should_call ? (
                                        <Check className="size-8 rounded-full border border-green-500 text-green-500" />
                                    ) : (
                                        <span className="rounded-full border border-red-500 px-2 py-0.5 text-2xl font-extrabold text-red-500">X</span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 p-6">
                        <div>{order.note}</div>
                    </div>
                </div>
                <div className="">
                    <ItemList items={order.order_items} />
                </div>
            </div>
        </AppLayout>
    );
};

export default OrderItems;
