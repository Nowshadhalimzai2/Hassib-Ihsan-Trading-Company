import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Payment } from '@/types'
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React from 'react'
interface Props{
    payment:Payment;
}

type OrderTypes = {
    id: number;
    currency_id: number;
    user_id: number;
    user: {
        id: number;
        name: string;
    };
};
interface UpdateProps{
    amount:number;
    invoice_number:string;
    notes?:string;
    currency_id:number;
}
const Edit = ({payment}:Props) => {
    const { put, data, setData, errors, reset, processing } = useForm<Required<UpdateProps>>({
        amount: payment ? payment.amount : 0,
        invoice_number: payment.invoice.invoice_number,
        notes: payment.notes ?? '',
        currency_id: payment.invoice.order ? payment.invoice.order.currency_id : payment.invoice.sale ? payment.invoice.sale.currency_id : 1,
    });

    const [orderInfo,setOrderInfo] = React.useState<OrderTypes>();
    
    const [invlaidInvoice, setInvalidInvoice] = React.useState<boolean>(false);
    React.useEffect(() => {
        const getCurrency = async () => {
            if (data.invoice_number.match(/^INV-\d+$/)) {
                await axios.get(route('currency.get', data.invoice_number)).then((res) => {
                    setOrderInfo(res.data);
                });
                if (orderInfo?.currency_id) setData('currency_id', orderInfo.currency_id);
                if (invlaidInvoice) setInvalidInvoice(false);
            } else setInvalidInvoice(true);
        };

        getCurrency();
    }, [invlaidInvoice,orderInfo,setData,data.invoice_number]);

    const handleUpdate=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        put(route('payments.update',payment.id),{
            onSuccess:()=>reset('amount','invoice_number','notes')
        });
    }

  return (
      <AppLayout
          breadcrumbs={[
              {
                  title: 'Payments',
                  href: route('payments.index'),
              },
              {
                  title: 'Payment Details',
                  href: route('payments.show', payment.id),
              },
              {
                  title: `Edit:#${payment.id}`,
                  href: route('payments.edit', payment.id),
              },
          ]}
      >
          <section>
              <div>
                  <h2 className="px-4 py-5 text-2xl font-semibold text-slate-800">Edit: {payment.id} </h2>
              </div>
              <div className="mx-auto max-w-4xl p-5">
                  <h3 className="text-center text-lg font-semibold">Edit Form</h3>
                  <h2 className="py-5 text-center text-lg font-medium text-slate-800">{orderInfo?.user && orderInfo.user.name}</h2>

                  <form onSubmit={handleUpdate} className="mx-auto w-4/5 rounded-md border p-8">
                      <fieldset>
                          <div>
                              <Label htmlFor="invoice_number">Invoice Number</Label>
                              <Input
                                  placeholder="Enter Invoice Number (INV-XXXXX)"
                                  required
                                  id="invoice_number"
                                  value={data.invoice_number}
                                  onChange={(e) => setData('invoice_number', e.target.value)}
                              />
                              {errors.invoice_number && <span className={'text-sm text-red-500'}>{errors.invoice_number}</span>}
                              {!data.invoice_number.match(/^INV-\d+$/) ? (
                                  <p className={'text-sm text-red-500'}>Invalid Invoie Number</p>
                              ) : (
                                  !orderInfo?.user && (
                                      <p className="text-sm text-red-400 italic">
                                          No Invoice for {data.invoice_number}. Please check the number and try again
                                      </p>
                                  )
                              )}
                          </div>
                      </fieldset>
                      <fieldset>
                          <div>
                              <Label htmlFor="amount">Amount</Label>
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
                              <Input
                                  placeholder="Enter Amount"
                                  required
                                  
                                  id="amount"
                                  value={data.amount}
                                  onChange={(e) => setData('amount', Number(e.target.value))}
                              />

                              {errors.amount && <p className="px-2 text-red-400 italic">{errors.amount}</p>}
                          </div>
                      </fieldset>
                      <fieldset>
                          <div className="my-2">
                              <Label htmlFor="notes">Note</Label>
                              <textarea
                                  className="w-full rounded-md border p-3"
                                  placeholder="Notes"
                                  id="notes"
                                  minLength={15}
                                  maxLength={255}
                                  value={data.notes}
                                  onChange={(e) => setData('notes', e.target.value)}
                              />
                              {errors.notes && <p className="px-2 text-red-400 italic">{errors.notes}</p>}
                          </div>
                      </fieldset>
                      <fieldset>
                          <Button disabled={processing} type="submit">
                              Update
                          </Button>
                      </fieldset>
                  </form>
              </div>
          </section>
      </AppLayout>
  );
}

export default Edit
