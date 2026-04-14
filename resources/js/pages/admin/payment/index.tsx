import FlashMessage from '@/components/builtIn/FlashMessage';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Payment } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import React, { memo } from 'react';

const Index = ({ payments }: { payments: Payment[] }) => {
 const [allPayments, setAllPayments] = React.useState<Payment[]>(payments);
 const [message, setMessage] = React.useState<{ error: string|null; success: string|null }>({ error: '', success: '' });
  const { success } = (usePage().props.flash as { success: string }) || null;
 const [searchTerm, setSearchTerm] = React.useState<string>('');
            React.useEffect(() => {
                    if (searchTerm === '') {
                        setAllPayments(payments);
                    } else {
                        const filteredPayments = payments.filter(
                            (payment) =>
                                payment.id.toString().includes(searchTerm.toLowerCase()) ||
                                payment.invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                payment.invoice.order?.id.toString().includes(searchTerm.toLowerCase()) ||
                                payment.invoice.order?.user.name.toLowerCase().includes(searchTerm.toLowerCase()),
                        );
                        setAllPayments(filteredPayments);
                    }
                   
                    if (success) {
                        setMessage({ error: null, success: success });
                    }
                    
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                }, [searchTerm]);
    const paymentList = allPayments.map((payment) => <PaymentCard key={payment.id} payment={payment} />);
    
    return (
        <AppLayout breadcrumbs={[{ title: 'Payments', href: 'admin/payments' }]}>
            <div className="bg-white">
                    <div className="flex flex-col items-center bg-slate-800 py-3 text-white rounded-md justify-center">
                        <h2 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">Payments</h2>
                    </div>
                        <p className='text-center mt-3'>Manage all payment records here.</p>

                   {message.success && <FlashMessage message={message} onClose={()=>setMessage({error:'',success:''})}/>}
                  
                <div className="mx-auto max-w-4xl px-8">
                    <div className="mt-20 flex flex-col justify-between lg:flex-row">
                        <div className="relative grow lg:mb-0">
                            <SearchIcon className="absolute top-2.5 left-2 inline size-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder={`Search Payments`}
                                className="mx-auto w-full rounded-lg border px-8 py-2 placeholder:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-1/2 lg:w-2/3"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <p className='text-sm text-gray-400 pt-1'>Search Payment id, Invoice Number, Order ID, or Customer Name. ${payments.length} records </p>
                        </div>

                        <div>
                            <Button onClick={() => router.visit(route('payments.create'))} variant="outline" className="w-full lg:ml-2 lg:w-fit">
                                New Payment
                            </Button>
                        </div>
                    </div>
                    <div className="mt-1 overflow-hidden rounded-lg bg-white py-3">
                        <div>
                            {allPayments.length > 0 ? (
                                <div className="mt-6 space-y-4">{paymentList}</div>
                            ) : (
                                <p className="mt-6 text-gray-500">No payments found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

const PaymentCard = ({ payment }: { payment: Payment }) => {
    
    return (
        <Link href={route('payments.show', payment.id)} className="mb-4 flex items-center hover:shadow hover:bg-gray-100 justify-between rounded-lg border bg-gray-50 p-4">
            <div>
                <p className="text-sm font-medium text-gray-900">Payment ID: {payment.id}</p>
                <p className="text-sm text-gray-500">Invoice Number: {payment.invoice.invoice_number}</p>
                <p className="text-sm text-gray-500">Order ID: {payment.invoice.order?.id}</p>
                <p className="text-sm text-gray-500">Customer Name: {payment.invoice.order?.user.name}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">
                    Amount:{' '}
                    <span className="block">
                        {payment.amount.toFixed(1)} <span>AFG</span>
                    </span>
                </p>
                <p className="text-sm text-gray-500">Status: {payment.invoice.payment_status}</p>
                <p className="text-sm text-gray-500">Date: {new Date(payment.invoice.invoice_date).toLocaleDateString()}</p>
            </div>
        </Link>
    );
};

export default memo(Index);
