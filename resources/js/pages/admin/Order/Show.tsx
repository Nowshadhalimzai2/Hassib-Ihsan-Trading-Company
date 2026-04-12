import TimeCard from '@/components/ui/TimeCard';
import TimeCounter from '@/components/ui/TimeCounter';
import AppLayout from '@/layouts/app-layout';
import { Order } from '@/types';
import React, { JSX } from 'react';
import ItemList from '../../../components/products/ItemList';
import Status from '@/components/admin/OrderItem/Status';
import { buttonVariants } from '@/components/ui/button';
import axios from 'axios';


const Show = ({ order }: { order: Order }): JSX.Element => {
    const [status, setStatus] = React.useState<'pending' | 'completed' | 'confirmed' | 'cancelled'>(order.status);
    const [deliveryTime, setDeliveryTime] = React.useState<string | null>(order.delivery_time || null);
    const timeProps = [
        { duration: '1', variant: 'default' as 'default' | 'outline' },
        { duration: '2', variant: 'outline' as 'default' | 'outline' },
        { duration: '4', variant: 'default' as 'default' | 'outline' },
        { duration: '8', variant: 'outline' as 'default' | 'outline' },
        { duration: '24', variant: 'default' as 'default' | 'outline' },
        { duration: '48', variant: 'outline' as 'default' | 'outline' },
    ];
    const timeCards=timeProps.map((props) => (
        <TimeCard
            key={props.duration}
            duration={props.duration}
            variant={props.variant}
            order={order}
            selected={deliveryTime === props.duration}
            setDeliveryTime={setDeliveryTime}
        />
    ));
    React.useEffect(() => {
        function updateStatus() {
            axios.patch(route('order.confirm', [order.id, status]), { status, order: order.id }).
            then((response) => {
                if (response.data.error){
                    alert(response.data.error);
                    setStatus(order.status);
                }
                setStatus(status);
                console.log('success', response);
                
            });
        }
        if (status !== order.status) {
            updateStatus();
        }
       
    }, [status, order.id, order.status]);

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Orders', href: '/admin/orders' },
                { title: `Order #${order.id}`, href: `/admin/orders/${order.id}/items` },
            ]}
        >
            <div>
                <div className="p-3">
                    <h2 className="rounded-lg bg-slate-700 py-3 text-center text-lg font-bold text-white md:text-2xl lg:text-3xl">
                        Order #{order.id}
                    </h2>
                    <div className="pt-5">
                        <div className="flex flex-wrap justify-between border-b px-4 py-3">
                            <div>
                                <p className="mb-5 text-gray-600">Customer: {order.user.name}</p>
                                <p className="mb-5 text-gray-600">
                                    Total Amount: {order.total_amount}{' '}
                                    <span className="rounded-sm bg-green-300 px-1">
                                        {order.currency_id === 1 ? 'AFG' : order.currency_id === 2 ? 'PKR' : 'USD'}
                                    </span>
                                </p>
                                <div className="mb-5 ">
                                    {/* order Status Card */}
                                    <Status status={status} setStatus={setStatus} deliveryTime={deliveryTime}/>
                                </div>
                                <div>
                                    {status==="confirmed" || status==="completed" ? (
                                        <a href={route('order.invoice.show', order.id)} className={buttonVariants({ variant: 'default' })+' w-full text-center'}>
                                            Invoice
                                        </a>
                                    ) : null}
                                </div>
                               
                            </div>
                            <div>
                                <p className="mb-5 text-gray-600">Address: {order.delivery_address}</p>
                                <p className="mb-5 text-gray-600">Phone: {order.user.phone}</p>
                                <p className="mb-5 text-gray-600">Placed on: {new Date(order.created_at).toLocaleString()}</p>
                                <p className="mb-5 text-gray-600">Note: {order.note}</p>
                            </div>
                        </div>
                        <div className="space-y-12 pt-10">
                            {status === 'confirmed' ? (
                                <>
                                    <h3 className="text-center text-lg font-bold md:text-xl lg:text-2xl">Assign Reception Time</h3>
                                    {deliveryTime != '' && deliveryTime !== null && (
                                        <div>
                                            <TimeCounter deliver_time={deliveryTime} order={order} />
                                        </div>
                                    )}

                                    <div className="flex flex-wrap justify-center gap-5">
                                        {timeCards}
                                    </div>
                                </>
                            ):(
                                status === 'pending' && (
                                <h3 className="text-center text-lg font-bold md:text-xl lg:text-2xl">Change Order Status to Confirmed to assign reception time</h3>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className="py-6">
                    <ItemList items={order.order_items} />
                </div>
            </div>
        </AppLayout>
    );
};

export default React.memo(Show);
