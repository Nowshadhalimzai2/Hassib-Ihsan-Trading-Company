import ReceiptHeader from '@/components/receipt-header';
import { Button, buttonVariants } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Payment } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ArrowRight, Clock, Printer } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FlashMessage from '@/components/builtIn/FlashMessage';
import { useState } from 'react';

interface Props {
    payment: Payment;
}
const Show = ({ payment }: Props) => {
     const [message, setMessage] = useState<{ error: string|null; success: string|null }>({ error: '', success: '' });
    
      const {error } = (usePage().props.flash as {error:string }) || null;
    if (error) {
        setMessage({ error: error, success: null });
    }
     const print = () => {
         const printContents = document.getElementById('invoice')?.innerHTML;
         const originalContents = document.body.innerHTML;
        
             if (printContents) {
                 if (confirm('Do you want to print the Receipt?')) {
                     document.body.innerHTML = printContents;
                     window.print();
                     document.body.innerHTML = originalContents;
                 }
             }
         
     };


    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Payments', href: route('payments.index') },
                { title: 'Payment Details', href: route('payments.show', payment.id) },
            ]}
        >
            <div className="mb-10 overflow-hidden rounded-sm bg-gray-50 pb-10 md:px-4 px-0 shadow">
                <h1 className="mt-3 mb-4 rounded-md border bg-slate-900 py-4 text-center text-lg font-semibold text-white md:text-2xl">
                    Payment Details
                </h1>
                {message.error && <FlashMessage message={message} onClose={() => setMessage({ error: '', success: '' })} />}
                <div className="flex justify-between md:px-12 px-2 lg:px-22 py-3">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'outline'}>Delete Payment</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Delete Payment</DialogTitle>
                            <DialogDescription>Once Payment Deleted, It connot be resotred agian!</DialogDescription>
                            <div>
                                <Button variant={'destructive'} onClick={() => router.delete(route('payments.destroy', payment.id))}>
                                    Yes, Delete Payment
                                </Button>
                                <DialogClose asChild>
                                    <Button variant={'outline'} className="ml-2">
                                        No, Cancel
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button variant={'outline'} onClick={() => router.visit(route('payments.edit', payment.id))}>
                        Edit Payment
                    </Button>
                </div>
                <div className="bg-accent mx-auto max-w-4xl rounded-sm md:px-8 px-0 lg:px-12 pb-8 text-gray-900" id="invoice">
                    <div>
                        <ReceiptHeader />
                    </div>
                    <div className="flex justify-center space-x-3 py-3">
                        <p className="text-lg font-medium">
                            Customer Name: <span>{payment.invoice.order?.user.name}</span>
                        </p>
                    </div>
                    <div className="my-5 px-2 flex items-center justify-between">
                        <div className="space-y-2 divide-y">
                            <p className="pb-3 text-sm md:textnormal">Payment ID: {payment.id}</p>
                            <p className="pb-3 text-sm md:textnormal"> Invoice Number: {payment.invoice.invoice_number}</p>
                            <p className="pb-3 text-sm md:textnormal">
                                <Clock className="mr-1" />
                                Order Date: {payment.invoice.order?.order_date.toLocaleString()}
                            </p>
                        </div>
                        <div className="space-y-2 divide-y">
                            <p className="pb-3">Amount: {payment.amount}</p>
                            <p className="pb-3">Payment Status: {payment.invoice.payment_status}</p>
                            <p className="pb-3">
                                {' '}
                                <Clock className="mr-1" />
                                Payment Date: {payment.payment_date.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 mb-5 rounded-sm border-2 px-2 border-transparent bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 bg-clip-border text-center">
                        <div className="bg-accent px-2 py-5 font-semibold text-slate-800">
                            Balance: <span>{payment.invoice.order && payment.invoice.order.total_amount - payment.amount}</span>
                            <span className="ml-1 inline">{payment.currency_id}AFG</span>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse px-2 justify-between italic">
                        <p>Thanks for being loyal with us.</p>
                        <p>Sign ......................</p>
                    </div>
                </div>
                <div className="mx-auto flex flex-col md:flex-row space-y-3 px-2 max-w-3xl justify-between py-4">
                    <button onClick={print} className="space-x-2 rounded-md border bg-slate-800 px-2.5 py-1 text-gray-50">
                        <Printer className="inline text-gray-200" />
                        <span>Receipt</span>
                    </button>
                    <a href={route('invoices.show', payment.invoice.order?.id)} className={`${buttonVariants({ variant: 'outline' })}`}>
                        <span> Go To Invoice</span>
                        <ArrowRight className="inline" />
                    </a>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
