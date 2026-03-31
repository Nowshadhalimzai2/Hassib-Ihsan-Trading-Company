import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Order, OrderItem, User as UserType } from '@/types';
import { ChartArea, Check, Clock, MapPin, MessageCircleWarningIcon, Phone, ShoppingBasket, User } from 'lucide-react';
import { memo } from 'react';

const OrderItems = ({ customer,order }: { customer:UserType, order: Order }) => {
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
        {
             title: 'Order Items',
            href: '/admin/customers/'+customer.id+'/orders/'+order.id,
        },
    ];
    const [date, time] = new Date(order.order_date).toLocaleString().split(',');
    return (<AppLayout breadcrumbs={breadcrumbs}>
        
            <div className="bg-accent min-h-screen pt-10 pb-20">
                <div className="mx-auto flex max-w-4xl flex-col items-center overflow-x-auto rounded-lg border bg-[#f1f7fa] pt-6 shadow">
                    <div className="p-3 text-3xl flex items-center gap-2 font-bold">
                        {order.status==="pending"&&
                        <div title='The Customer is still waiting for Order to receive'>
                            <MessageCircleWarningIcon  className='text-yellow-500 size-10'/>
                        </div>}
                        Order #{order.id}</div>
                    <div className="CUSTOMERINFO w-full border-b p-4 ">
                        <div className='flex items-center justify-center gap-3 pb-8'>
                            <div >
                                <User className='size-12 rounded-full border'/></div>
                        <h4 className="text-lg font-semibold">{customer.name}</h4>
                        </div>
                        <div className='flex justify-evenly items-center'>
        
                             <div className="ContactInfo text-center font-serif font-semibold">
                                {customer.phone ? (
                                    <div className='flex gap-2 items-center'>
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
                    <div className="ORDERINFO border-b flex w-full items-center justify-between p-6 px-8 md:px-10 lg:px-12">
                        <div className="text-xl font-semibold text-gray-500">
        
                            <div>
                                {' '}
                                Total:
                                <span className="mx-1 text-lg text-blue-400">{order.total_amount}</span>
                                <span>{order.currency_id == 1 ? 'AFG' : order.currency_id == 2 ? 'PAK' : 'USD'}</span>
                            </div>
                            <div className='flex gap-2'>
                                <ShoppingBasket/>
                                Items count: <span className="text-blue-500">{order.order_items.length}</span>
                            </div>
                            <div className={`flex gap-2 ${order.status=='pending'?"text-yellow-500":"text-green-500"}`}>
                                <ChartArea/>
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
                                <span className="text-gray-500 flex ">
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
                        <div>
                            {order.note}
                        </div>
                    </div>
                </div>
                <div className="">
                    <Item items={order.order_items} />
                </div>
            </div>
    </AppLayout>
    );
};

const Item = ({ items }: { items: OrderItem[] }) => {
    return (
        <div>
            <h2 className="mx-auto  my-3 max-w-7xl rounded-lg bg-blue-100 py-4 text-center text-2xl font-bold">Order Item List</h2>
            <div className="flex flex-col px-5">
                {items.map((item, ind) => (
                    <div key={ind} className="mx-auto mb-1 flex w-full max-w-6xl items-center justify-evenly border-b bg-blue-50 py-3 shadow-sm">
                        <span>{ind + 1}</span>
                        <span>{<img src={item.product.images.filter((img) => img.is_primary && img.image_path)} />}</span>
                        <span>{item.product.name}</span>
                        <span className="">{item.quantity}</span>
                        <span>{item.unit_price}</span>
                        <span>{item.subtotal}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(OrderItems);
