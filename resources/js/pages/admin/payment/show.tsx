import ReceiptHeader from '@/components/receipt-header';
import { Button, buttonVariants } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Payment } from '@/types';
import {usePage } from '@inertiajs/react';
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
               
                     document.body.innerHTML = printContents;
                     window.print();
                     document.body.innerHTML = originalContents;
                 
             }
         
     };


    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Payments', href: route('payments.index') },
                { title: 'Payment Details', href: route('payments.show', payment.id) },
            ]}
        >
            <div className="mb-10 overflow-hidden rounded-sm bg-gray-50 px-0 pb-10 shadow md:px-4">
                <h1 className="mt-3 mb-4 rounded-md border bg-slate-900 py-4 text-center text-lg font-semibold text-white md:text-2xl">
                    Payment Details
                </h1>
                {message.error && <FlashMessage message={message} onClose={() => setMessage({ error: '', success: '' })} />}

                <div className="bg-accent mx-auto max-w-4xl rounded-sm px-0 pb-8 text-gray-900 md:px-8 lg:px-12" id="invoice">
                    <div>
                        <ReceiptHeader />
                    </div>
                    <div className="flex justify-center space-x-3 py-3">
                        <p className="text-lg font-medium">
                            Customer Name: <span>{payment.invoice.order?.user.name}</span>
                        </p>
                    </div>
                    <div className="my-5 flex items-center justify-between px-2">
                        <div className="space-y-2 divide-y">
                            <p className="md:textnormal pb-3 text-sm">Payment ID: {payment.id}</p>
                            <p className="md:textnormal pb-3 text-sm"> Invoice Number: {payment.invoice.invoice_number}</p>
                            <p className="md:textnormal pb-3 text-sm">
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
                    <div className="mt-10 mb-5 rounded-sm border-2 border-transparent bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 bg-clip-border px-2 text-center">
                        <div className="bg-accent px-2 py-5 font-semibold text-slate-800">
                            Balance: <span>{payment.invoice.order && payment.invoice.order.total_amount - payment.amount}</span>
                            <span className="ml-1 inline">{payment.currency_id}AFG</span>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse justify-between px-2 italic">
                        <p>Thanks for being loyal with us.</p>
                        <p>Sign ......................</p>
                    </div>
                </div>
                <div className="mx-auto flex max-w-3xl flex-col justify-between space-y-3 px-2 py-4 md:flex-row">
                    <Dialog>
                        <DialogTrigger asChild>
                           <Button> <Printer className="inline text-gray-200" />
                                <span>Receipt</span></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Print Receipt</DialogTitle>
                            <DialogDescription>Do you want to download the receipt?</DialogDescription>
                            <Button variant={'outline'} onClick={print}>Print Receipt</Button>
                            <DialogClose asChild>
                                <Button variant={'destructive'}>Cancel</Button>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                    <a href={route('invoices.show', payment.invoice.id)} className={`${buttonVariants({ variant: 'outline' })}`}>
                        <span> Go To Invoice</span>
                        <ArrowRight className="inline" />
                    </a>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
