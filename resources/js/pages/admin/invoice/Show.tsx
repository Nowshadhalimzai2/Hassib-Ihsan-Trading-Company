import AppLogoIcon from '@/components/app-logo-icon';
import FlashMessage from '@/components/builtIn/FlashMessage';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Order } from '@/types';
import axios from 'axios';
import { useState } from 'react';
interface Props {
    order: Order;
    invoice_number: string;
    is_invoice_exists: boolean;
}
const Show = ({ order, invoice_number, is_invoice_exists }: Props) => {
    const [message, setMessage] = useState({
        error: '',
        success: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Orders', href: '/admin/orders' },
        { title: `Order #${order.id}`, href: `/admin/orders/${order.id}/items` },
        { title: 'Invoice', href: `/admin/invoices/${order.id}` },
    ];

    const print = () => {
        const printContents = document.getElementById('invoice')?.innerHTML;
        const originalContents = document.body.innerHTML;

        if (!is_invoice_exists) {
            if (printContents) {
                axios
                    .post(route('invoices.store'), { order_id: order.id })
                    .then(() => {
                        if (confirm('Do you want to print the invoice?')) {
                            document.body.innerHTML = printContents;
                            window.print();
                            document.body.innerHTML = originalContents;
                        }
                        setMessage({ error: '', success: 'Invoice created successfully!' });
                    })
                    .catch((error) => {
                        console.error('Error creating invoice:', error);
                        setMessage({ error: "The invoice has already been created for this order or the order doesn' exist.", success: '' });
                    });
            }
        } else {
            if (printContents) {
                if (confirm('Do you want to print the invoice?')) {
                    document.body.innerHTML = printContents;
                    window.print();
                    document.body.innerHTML = originalContents;
                }
            }
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen max-w-full bg-gray-50">
                <div className="mx-auto max-w-6xl rounded-sm px-5 py-3">
                    <h2 className="rounded-lg bg-slate-700 py-3 text-center text-lg font-bold text-white md:text-2xl lg:text-3xl">
                        Invoice for Order #{order.id}
                    </h2>
                    <div className='py-3 flex items-center justify-center bg-red-500/15 border border-red-500 rounded-md mt-1'>
                        {is_invoice_exists && <p className="text-red-500">Invoice already exists for this order. you can print it below.</p>}
                        <FlashMessage message={message} duration={5000} />
                    </div>
                    <section id="invoice" className="mt-4 ">
                        <div className="INVOICE mx-auto max-w-4xl rounded-sm bg-white px-4">
                            <div className="flex w-full items-center justify-between px-4">
                                <div className="flex flex-1 items-center justify-between text-2xl font-bold">
                                    <span className="bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                                        BasitIshaq Ltd
                                    </span>
                                    <AppLogoIcon className="size-36" />
                                </div>

                                <div className="w-fit bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent">
                                    د باسط اسحاق تجارتي شرکت
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between px-5 py-4">
                                    <div className="space-y-2">
                                        <p>
                                            Invoice Number: <span className="font-bold">{invoice_number}</span>
                                        </p>
                                        <p>Customer: {order.user.name}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="">Invoice Date: {new Date().toLocaleString().split(' ')[0]}</p>
                                        <p>Order Date: {order.order_date.toLocaleString().split(' ')[0]}</p>
                                    </div>
                                </div>
                                <div>
                                    <table className="w-full border-collapse border">
                                        <thead>
                                            <tr className="bg-gray-300">
                                                <th className="border px-4 py-2">ID</th>
                                                <th className="border px-4 py-2">Item</th>
                                                <th className="border px-4 py-2">Quantity</th>
                                                <th className="border px-4 py-2">Price</th>
                                                <th className="border px-4 py-2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {order.order_items.map((item, ind) => (
                                                <tr key={item.id} className="odd:bg-gray-100">
                                                    <td className="border px-4 py-2">{ind + 1}</td>
                                                    <td className="border px-4 py-2">{item.product.name}</td>
                                                    <td className="border px-4 py-2">{item.quantity}</td>
                                                    <td className="border px-4 py-2">{item.unit_price}</td>
                                                    <td className="border px-4 py-2">{item.quantity * item.unit_price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="flex items-end justify-between">
                                        <div className="">
                                            <p> Sign: ..............................</p>
                                            <div className="">
                                                <p>Thank you for your purchase!</p>
                                                <p>!ستاسې د پیریدنې څخه مننه</p>
                                            </div>
                                        </div>
                                        <table className="mt-2">
                                            <tbody className="">
                                                <tr className="bg-gray-200">
                                                    <td className="border px-4 py-2 text-left font-bold">Total Amount:</td>
                                                    <td colSpan={3} className="border px-4 py-2 font-bold">
                                                        {order.total_amount}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    {' '}
                                                    <td className="border px-4 py-2 text-left font-bold">Paid Amount:</td>
                                                    <td colSpan={3} className="border px-4 py-2 font-bold">
                                                        {order.total_amount}
                                                    </td>
                                                </tr>
                                                <tr className="bg-gray-200">
                                                    <td className="border px-4 py-2 text-left font-bold">Remaining Amount:</td>
                                                    <td colSpan={3} className="border px-4 py-2 font-bold">
                                                        {order.total_amount}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-5 text-red-300">
                                        <p>Note: The sold items are non-refundable.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="py-8">
                        <Button onClick={print} className="mt-5 w-full text-center">
                            {is_invoice_exists ? 'Print' : 'Create'} Invoice
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
