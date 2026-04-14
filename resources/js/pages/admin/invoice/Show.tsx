import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Invoice } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertCircle, ArrowDown, ArrowUp, Calendar, DollarSign, Package2, Printer, User } from 'lucide-react';
import { useState } from 'react';
const Show = ({ invoice }: { invoice: Invoice }) => {
    const [isCollapsed,setIsCollapsed]=useState<boolean>(true);
    const paidAmount:number = invoice.payments.reduce((acc, payment) => (acc += payment.amount), 0);
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Invoices', href: route('invoices.index') },
                { title: 'Invoice: ' + invoice.id, href: route('invoices.show', invoice.id) },
            ]}
        >
            <div className="">
                <div className="Header mx-auto mt-3 max-w-5xl">
                    <div>
                        <h2 className="rounded-md bg-slate-800 p-4 text-center text-lg font-semibold text-white md:text-xl lg:text-2xl">
                            Invoice Details
                        </h2>
                    </div>
                    <div className="mt-8 px-4 py-2">
                        <div className="grid grid-cols-2 gap-2 p-3 text-slate-800">
                            <h4 className="rounded-sm border p-2 text-lg font-medium">Invoice Number: {invoice.invoice_number}</h4>
                            <p className="rounded-sm border p-2 text-lg font-medium">
                                <User className="inline" /> {invoice.order?.user.name}
                            </p>
                            <p className="rounded-sm border p-2 text-lg font-medium">
                                <Calendar className="inline" /> {invoice.invoice_date.toLocaleString()}
                            </p>
                            <p className="rounded-sm border p-2 text-lg font-medium">
                                {' '}
                                <Package2 className="inline" /> {invoice.payment_status}
                            </p>
                            <p className="rounded-sm border p-2 text-lg font-medium">
                                <DollarSign className="inline size-6 border text-green-400" /> {invoice.order?.total_amount}
                            </p>
                            <p className="rounded-sm border p-2 text-lg font-medium">
                                Total Paid Amount: {paidAmount}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5">
                            {invoice.order && <Button disabled={paidAmount>=invoice.order?.total_amount}
                                onClick={(e)=>{
                                    e.preventDefault();
                                    router.get(route('payments.create'));
                                }}
                            >Pay for Invoice</Button>}
                            <Button
                                className="w-fit"
                                variant={'outline'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.get(route('invoices.show.print', invoice.order?.id || invoice.sale?.id));
                                }}
                            >
                                <Printer className="" />
                                Print Invoice
                            </Button>
                        </div>
                    </div>
                    <section className="CollapseField py-8">
                        <div className="">
                            <Button
                                onClick={() => setIsCollapsed((pre) => !pre)}
                                variant={'ghost'}
                                className="flex w-full items-center justify-end border py-1 transition-all duration-300"
                            >
                                <span>{isCollapsed ? <ArrowDown /> : <ArrowUp />}</span>
                            </Button>
                            {!isCollapsed ? (
                                <div className="border p-3 rounded-md mt-3
                                ">
                                    <table className="w-full border overflow-hidden rounded-md">
                                        <thead className="">
                                            <th className='py-1'>ID</th>
                                            <th className='py-1'>Item</th>
                                            <th className='py-1'>Unit Price </th>
                                            <th className='py-1'>Quantity</th>
                                            <th className='py-1'>Sub Total</th>
                                        </thead>
                                        <tbody className="gap-y-1">
                                            {invoice.order?.order_items.map((item, index) => {
                                                return (
                                                    <tr className="odd:bg-gray-300">
                                                        <td className="py-1 text-center">{index + 1}</td>
                                                        <td className="py-1 text-center">{item.product.name}</td>
                                                        <td className="py-1 text-center">{item.unit_price}</td>
                                                        <td className="py-1 text-center">{item.quantity}</td>
                                                        <td className="py-1 text-center">{item.subtotal}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </section>
                    <section className="PaymentList mt-8 rounded-sm border-t bg-gray-50 py-4">
                        <div>
                            <h3 className="py-2 text-center text-lg font-semibold md:text-xl">Payments History</h3>
                        </div>
                        <div className="flex flex-col gap-y-1 py-8">
                            {invoice.payments.length > 0 ? (
                                invoice.payments.map((payment, index) => {
                                    return (
                                        <Link href={route('payments.show',payment.id)} key={index} className="overflow-hidden px-2">
                                            <div className="flex w-full justify-between rounded-md border bg-white p-5 text-gray-600 transition-all duration-150 transform-flat hover:scale-101 hover:bg-gray-100">
                                                <p>Operator Name: {payment?.user.name}</p>
                                                <p>Total Amount: {payment.amount}</p>
                                                <p>Currency: {payment.currency_id === 1 ? 'AFG' : payment.currency_id === 2 ? 'PKR' : 'USD'}</p>
                                                <p>Payment Date: {payment.payment_date.toLocaleString()}</p>
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                <p className="text-center text-gray-600">No payments done yet!</p>
                            )}
                        </div>
                    </section>
                    <div className="DeleteInvoice flex justify-end py-12">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={'destructive'} className="w-fit">
                                    Delete Invoice
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>
                                    Delete Invoice <AlertCircle className="inline pl-1 text-red-600" />
                                </DialogTitle>
                                <DialogDescription>
                                    Be Cautiase! The action cannot be undone. Make sure you selected the right resource before deleting it.
                                </DialogDescription>
                                <DialogFooter>
                                    <Button
                                        variant={'destructive'}
                                        onClick={() => {
                                            router.delete(route('invoices.destroy', invoice.id));
                                        }}
                                    >
                                        Yes! Delete Invoice
                                    </Button>
                                    <DialogClose asChild>
                                        <Button>No! Keep Invoice</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;

