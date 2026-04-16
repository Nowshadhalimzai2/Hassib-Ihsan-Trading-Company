import axios from 'axios';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react'

const OrderNotificatinBadge = () => {
    const [countNewInvoices,setCountNewInvoices]=useState<number>(0);
    useEffect(()=>{
        
            axios.get(route('get.new-orders.count')).then(res=>{
                 console.log('success',res.data.new_invoices_count);
                  setCountNewInvoices(res.data.new_invoices_count);
            });
          
    },[])
  return (
      <div className="absolute top-1.5 right-3 flex items-center space-x-1">
          {countNewInvoices !== 0 && (
              <>
                  <Bell className="size-4 text-yellow-600" />
                  <p>{countNewInvoices}</p>
              </>
          )}
      </div>
  );
}

export default OrderNotificatinBadge
