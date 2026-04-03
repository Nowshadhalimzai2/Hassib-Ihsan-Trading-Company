import { Order } from "@/types";
import { useEffect, useState } from "react";

interface Props{
    deliver_time:string;
    order:Order;
}
const TimeCounter = ({ deliver_time , order }: Props) => {
  const storageKey = `delivery_target_time_${order.id}`;
   const [secondsLeft, setSecondsLeft] = useState(()=>parseInt(localStorage.getItem(storageKey) as string));
    useEffect(() => {
    const delivery_time = parseInt(deliver_time, 10);
    // Check if we already have a saved target time for this order
    const savedTarget = localStorage.getItem(storageKey);
    let targetTime: number;
    if (savedTarget) {
      targetTime = parseInt(savedTarget, 10);
    } else  {
      targetTime = new Date().getTime() + delivery_time * 60 * 60 * 1000;
      localStorage.setItem(storageKey, targetTime.toString());
    }

    const updateCountdown = () => {     
      // If order is not confirmed, stop the interval and do not update countdown
        const diff = Math.floor((targetTime - new Date().getTime()) / 1000);
        setSecondsLeft(Math.max(0, diff));
    };
    if (order.status !== "confirmed") {
      localStorage.setItem(storageKey,secondsLeft.toString());
      return;
    }
    updateCountdown(); // run immediately
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [order.id, deliver_time,order.status,secondsLeft,storageKey]);


  // Format as HH:MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  console.log(secondsLeft);
  
  return (
    <div className={`TimeCounter border w-fit mx-auto ${secondsLeft < 600 ? "border-red-500 text-red-500" : (secondsLeft<1200 ? "border-yellow-500 text-yellow-500" :(order.status==="completed"?"text-gray-500 border-gray-500": "border-green-500 text-green-400 bg-green-200"))} px-6 py-5 rounded-sm text-2xl md:text-3xl lg:text-4xl font-bold`}>
        {formatTime(secondsLeft)&&formatTime(secondsLeft) }
    </div>
  )
}

export default TimeCounter
