import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout'
import { Invoice } from '@/types';
import { Link } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
interface Props {
    invoices: Invoice[];
}
const Index = ({invoices}:Props) => {
    
    
    const [searchTerm,setSearchTerm]=useState<string>('');
    const [initailInvoices,setInitialInvoices]=useState<Invoice[]>(invoices);
    useEffect(()=>{
        
        if (searchTerm === '') setInitialInvoices(invoices);
        else {
            setInitialInvoices(() =>
                invoices.filter(
                    (inv) =>
                        inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        inv.order?.user.name.toLowerCase().includes(searchTerm.toLowerCase()),
                ),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchTerm]);
    const invoiceList=initailInvoices.map((invoice,index)=>{
                        return (
                            <Link href={route('invoices.show', invoice.id)} key={index} className="rounded-sm border bg-gray-50 p-4 flex justify-between">
                                <div>
                                    <p>Invoice Number: {invoice.invoice_number}</p>
                                    <p>Customer Name: {invoice.order?.user.name}</p>
                                    <p>Order Status: {invoice.order?.status}</p>
                                    <p>Times Paid: {invoice.payments.length}</p>
                                </div>
                                <div>
                                    <p>Invoice Date: {invoice?.invoice_date.toLocaleString().split(' ')[0]}</p>
                                    <p>Payment Status: {invoice.payment_status}</p>
                                    <p>Total Invoice Amount: {invoice.order?.total_amount}</p>
                                    <p>Total Payment: {invoice.payments.reduce((acc,payment)=>{
                                        return acc+=payment.amount;
                                    },0)}</p>
                                </div>
                            </Link>
                        );
                    });

  return (
      <AppLayout
          breadcrumbs={[
              {
                  title: 'Invoices',
                  href: route('invoices.index'),
              },
          ]}
      >
          <div className="p-4 bg-white">
              <div>
                  <h2 className='w-full p-3 rounded-md font-semibold bg-slate-800 text-white text-center lg:text-2xl md:text-xl text-lg'>Invoices </h2>
                  <p className='text-center text-gray-600 text-sm md:text-[16px] mt-2 py-4'>You can find all invoices here!</p>
              </div>
              <div className="p-4 max-w-4xl mx-auto">
                 <div className="SearchField relative">
                    <SearchIcon size={22} className='text-gray-500 absolute top-2 left-2 '/>
                    <Input placeholder='Search for Invoices (Invoice Number, Customer Name)' id='search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='px-9 h-10'/>
                 </div>
              </div>
              <div className='border px-5 py-6 rounded-sm space-y-1 flex flex-col max-w-4xl mx-auto'>
                    {invoiceList}
              </div>
          </div>
      </AppLayout>
  );
}

export default Index
