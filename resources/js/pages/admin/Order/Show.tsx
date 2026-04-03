import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TimeCard from '@/components/ui/TimeCard';
import TimeCounter from '@/components/ui/TimeCounter';
import AppLayout from '@/layouts/app-layout';
import { Order } from '@/types';
import { Fieldset } from '@headlessui/react';
import { router, useForm } from '@inertiajs/react';
import React from 'react';
import ItemList from '../../../components/products/ItemList';

interface InvoiceProps {
    notes: string;
    payment_status: 'unpaid' | 'paid';
    total_amount: number;
    order_id: number;
};
const Show = ({ order }: { order: Order }) => {
    const [status, setStatus] = React.useState<'pending' | 'completed' | 'confirmed' | 'cancelled'>(order.status);
    const [deliveryTime, setDeliveryTime] = React.useState<string | null>(order.delivery_time || null);
    const [showInvoiceFields, setShowInvoiceFields] = React.useState<boolean>(false);
    const { post, data, setData, errors, processing, reset } = useForm<InvoiceProps>({
        notes: '',
        order: order.id,
        payment_status: 'unpaid',
        total_amount: order.total_amount,
    });
    const submitInvoice=()=>{
        post(route('invoices.store'),{
            onFinish:()=>reset('notes','payment_status','total_amount','order_id')
        })
    }
    React.useEffect(() => {
        function updateStatus() {
            router.patch(route('order.confirm', [order.id, status]), { status, order: order.id });
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
                                <div className="mb-5 text-gray-600">
                                    Status :{' '}
                                    <div>
                                        <select
                                            onChange={(e) => setStatus(e.target.value as 'pending' | 'completed' | 'confirmed' | 'cancelled')}
                                            className={`${status === 'pending' ? 'bg-amber-300' : status === 'confirmed' ? 'bg-blue-300' : status === 'cancelled' ? 'bg-red-300' : 'bg-green-300'} rounded-sm px-3 py-1.5 text-white`}
                                        >
                                            <option disabled value="pending" className="bg-white text-black" selected={status === 'pending'}>
                                                Pending
                                            </option>
                                            <option
                                                disabled={status === 'completed'}
                                                value="confirmed"
                                                className="bg-white text-black"
                                                selected={status === 'confirmed'}
                                            >
                                                Confirmed
                                            </option>
                                            <option
                                                disabled={status !== 'confirmed' || deliveryTime === null}
                                                value="completed"
                                                className="bg-white text-black"
                                                selected={status === 'completed'}
                                            >
                                                Completed
                                            </option>
                                            <option value="cancelled" className="bg-white text-black" selected={status === 'cancelled'}>
                                                Cancelled
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    {status === 'confirmed' && (
                                        <Button className="rounded-sm" onClick={() => setShowInvoiceFields((pre) => !pre)}>
                                           {!showInvoiceFields ? "Create Invoice":"Close"}
                                        </Button>
                                    )}
                                    {showInvoiceFields && (
                                        <div className=''>
                                            <form onSubmit={submitInvoice}>
                                                <Fieldset className={'space-y-3 py-3 px-2 rounded-md border-slate-800 bg-slate-700 text-white border mt-2'}>
                                                    <div >
                                                        <Input value={data.notes} onChange={(e)=>setData('notes',e.target.value)} placeholder="Add notes" className='placeholder:text-gray-200 placeholder:italic'/>
                                                        <div>{errors.notes}</div>
                                                    </div>

                                                    <div>
                                                        <select value={data.payment_status} onChange={(e)=>setData('payment_status',e.target.value as 'unpaid'|'paid')} className='border rounded-md py-1.5 px-1 w-full bg-slate-700'>
                                                            <option value="#" className='text-gray-300 rounded-sm'>Select Payment Method</option>
                                                            <option value="unpaid" selected>Unpaid</option>
                                                            <option value="paid">Paid</option>
                                                        </select>
                                                    </div>
                                                    <Button disabled={processing} type='submit' className='w-full text-gray-800' variant={'outline'}>Submit</Button>
                                                </Fieldset>
                                            </form>
                                        </div>
                                    )}
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
                            {status === 'confirmed' && (
                                <>
                                    <h3 className="text-center text-lg font-bold md:text-xl lg:text-2xl">Assign Reception Time</h3>
                                    {deliveryTime != '' && deliveryTime !== null && (
                                        <div>
                                            <TimeCounter deliver_time={deliveryTime} order={order} />
                                        </div>
                                    )}

                                    <div className="flex flex-wrap justify-center gap-5">
                                        <TimeCard
                                            duration="1"
                                            title="hours"
                                            order={order}
                                            selected={deliveryTime === '1'}
                                            setDeliveryTime={setDeliveryTime}
                                        />
                                        <TimeCard
                                            duration="2"
                                            title="hours"
                                            variant="outline"
                                            order={order}
                                            selected={deliveryTime === '2'}
                                            setDeliveryTime={setDeliveryTime}
                                        />
                                        <TimeCard
                                            duration="4"
                                            title="hours"
                                            order={order}
                                            selected={deliveryTime === '4'}
                                            setDeliveryTime={setDeliveryTime}
                                        />
                                        <TimeCard
                                            duration="8"
                                            title="hours"
                                            variant="outline"
                                            order={order}
                                            selected={deliveryTime === '8'}
                                            setDeliveryTime={setDeliveryTime}
                                        />
                                        <TimeCard
                                            duration="24"
                                            title="hours"
                                            order={order}
                                            selected={deliveryTime === '24'}
                                            setDeliveryTime={setDeliveryTime}
                                        />
                                        <TimeCard
                                            duration="48"
                                            title="hours"
                                            variant="outline"
                                            order={order}
                                            selected={deliveryTime === '48'}
                                            setDeliveryTime={setDeliveryTime}
                                        />
                                    </div>
                                </>
                            )}
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
