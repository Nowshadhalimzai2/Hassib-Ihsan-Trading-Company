import React from 'react'
import { Button } from './button';
import axios from 'axios';
import { Order } from '@/types';
interface Props{
    order: Order;
    duration:string;
    
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    selected:boolean;
    setDeliveryTime: React.Dispatch<React.SetStateAction<string | null>>;
}
const TimeCard = ({ order, duration, variant,selected, setDeliveryTime }: Props) => {
    const assignTime=(time:string)=>{
        axios.patch(route('order.delivery.time', [order.id, time])).then(res=>{
            if(res.status===200){
               setDeliveryTime(time);
                const storageKey = `delivery_target_time_${order.id}`;
                // const savedTarget = localStorage.getItem(storageKey);
                // let targetTime: number;
                // if (savedTarget) {
                //     targetTime = parseInt(savedTarget, 10);
                // } else {
                    const targetTime = new Date().getTime() + parseInt(time) * 60 * 60 * 1000;
                    localStorage.setItem(storageKey, targetTime.toString());
    // }

            }
        });

    }
  
    return (
    <Button disabled={selected} variant={variant} className={`${selected ? "bg-blue-300 border text-black border-red-500 shadow-blue-500 shadow-md" : ""}`} onClick={()=>assignTime(duration)}>
        <p>Within</p>
        <p> {duration} hour{duration !== '1' && 's'} </p>
    </Button>
  )
}

export default TimeCard
