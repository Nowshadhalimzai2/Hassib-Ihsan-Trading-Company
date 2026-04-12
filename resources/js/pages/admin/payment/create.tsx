import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout'
import { useForm } from '@inertiajs/react'
import axios from 'axios';
import React from 'react';

type OrderTypes={
    id:number;
    currency_id:number;
    user_id:number;
    user:{
        id:number;
        name:string;
    }
}
const Create = () => {
    const [orderInfo,setOrderInfo] = React.useState<OrderTypes>();
    const {post,reset,processing,errors,data,setData} = useForm({
        invoice_number:'INV-',
        amount:'',
        notes:'',
        currency_id:1,
    });
    const [invlaidInvoice,setInvalidInvoice]=React.useState<boolean>(false);
    // Fetch currency based on invoice number
    React.useEffect(() => {
        
        const getCurrency=async ()=>{            
            if(data.invoice_number.match(/^INV-\d+$/)){
                await axios.get(route('currency.get', data.invoice_number)).then((res)=>{
                    setOrderInfo(res.data);
                });
                if(orderInfo?.currency_id)
                setData('currency_id',orderInfo.currency_id);
                if(invlaidInvoice)
                    setInvalidInvoice(false);   
                
            }
                else
                    setInvalidInvoice(true);
        }
    
        getCurrency();
        

    },[data.invoice_number,errors.invoice_number,orderInfo?.currency_id,orderInfo,setData,invlaidInvoice]);

    // Post new payment
    const createPayment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('payments.store'),{
            onSuccess: () => {
                reset();
            }
        })
    }
  return (
      <AppLayout
          breadcrumbs={[
              { title: 'Payments', href: route('payments.index') },
              { title: 'Create Payment', href: route('payments.create') },
          ]}
      >
          <div className="mb-10 overflow-hidden rounded-sm bg-gray-50 px-4 shadow">
              <h1 className="mt-3 mb-4 rounded-md border bg-slate-900 py-4 text-center text-lg font-semibold text-white md:text-2xl">
                  Create New Payment
              </h1>
              <p className="text-center text-sm font-medium text-gray-700">Please fill out the form below to create a new payment.</p>
              <div className="bg-accent mx-auto max-w-4xl rounded-sm px-12 pb-8 text-gray-900">
                  <div className="Form mt-5 py-4">
                      <h2 className="py-5 text-center text-lg font-medium text-slate-800">{orderInfo?.user && orderInfo.user.name}</h2>
                      <h3 className="py-5 text-center text-lg font-semibold text-slate-800 md:text-xl">Payment Form</h3>
                      <form className="mx-auto w-3/4 space-y-4" onSubmit={createPayment}>
                          <fieldset className="mb-4">
                              <label htmlFor="invoice_number" className="block text-sm font-medium text-gray-700">
                                  Invoice Number
                              </label>
                              <Input
                                  placeholder="Enter invoice Number (ex:    INV-XXXX)"
                                  value={data.invoice_number}
                                  onChange={(e) => setData('invoice_number', e.target.value)}
                                  required
                              />

                              {errors.invoice_number && <span className={'text-sm text-red-500'}>{errors.invoice_number}</span>}
                              {!data.invoice_number.match(/^INV-\d+$/) ? (
                                  <p className={'text-sm text-red-500'}>
                                      Invalid Invoie Number
                                  </p>
                              ):(!orderInfo?.user&&<p className='text-red-400 italic text-sm'>No Invoice for {data.invoice_number}. Please check the number and try again</p>)}
                          </fieldset>
                          <fieldset className="mb-4">
                              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                  Amount{' '}
                                  {orderInfo?.currency_id && (
                                      <p className="text-sm text-gray-500 italic">
                                          You only need to to pay{' '}
                                          <span>
                                              {orderInfo?.currency_id === 1
                                                  ? 'AFG'
                                                  : orderInfo?.currency_id === 2
                                                    ? 'PKR'
                                                    : orderInfo?.currency_id === 3
                                                      ? 'USD'
                                                      : ''}{' '}
                                          </span>{' '}
                                          currency amount
                                      </p>
                                  )}
                              </label>
                              <Input
                                  placeholder="Enter amount"
                                  value={data.amount}
                                  onChange={(e) => setData('amount', e.target.value)}
                                  required
                                  type="number"
                              />
                              <span className={'text-sm text-red-500'}>{errors.amount}</span>
                          </fieldset>

                          <fieldset className="mb-4">
                              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                  Notes
                              </label>
                              <textarea
                                  placeholder="Enter some notes (Optional)"
                                  className="block w-full rounded-md border px-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                  value={data.notes}
                                  onChange={(e) => setData('notes', e.target.value)}
                              />
                              <span className={'text-sm text-red-500'}>{errors.notes}</span>
                          </fieldset>
                          <Button disabled={processing} type="submit" className="w-full">
                              Create Payment
                          </Button>
                      </form>
                  </div>
              </div>
          </div>
      </AppLayout>
  );
}

export default Create
