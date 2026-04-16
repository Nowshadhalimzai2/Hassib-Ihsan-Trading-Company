<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        Order::where('is_seen', false)->update(['is_seen' => true]);
        $orders=Order::with('user:id,name')->get();
        return Inertia::render('admin/Order/Index', compact('orders'));
    }
    public function show(Order $order)
    {
        $order->load(['orderItems.product','orderItems.product.images','user:id,name'])->get();
        return Inertia::render('admin/Order/Show', compact('order'));
    }
    public function confirm(Order $order, $status){
        DB::beginTransaction();
        try{
            $order->status = $status;
            $order->save();
            if($status=="confirmed"){
                // Decrease stock for each product in the order
                
                foreach($order->orderItems()->with('product')->get() as $item){
                    $product=$item->product;
                    if($product->quantity_in_stock < $item->quantity){
                        return response()->json(['error'=>'Not enough stock for '.$product->name]);
                        }
                        $product->quantity_in_stock -= $item->quantity;
                        $product->save();
                        } 
                        }
                      
                        DB::commit();
            return response()->json(['message' => 'Order confirmed successfully']);
        }
        catch(\Exception $e){
            DB::rollBack();
            return response()->json(['error'=>'An error occured while confirming the order: '.$e->getMessage()]);
        }
        // return response()->json(['message' => 'Order ' . $status . ' with delivery time: ' ]);
    }
    public function delivery(Order $order, $time){
        $order->delivery_time = $time;
        $order->save();
        return response()->json(['message' => 'Order delivery time set to: ' . $time . ' hours']);
    }
    public function destroyItem(OrderItem $item){
        $item->delete();
        return response()->json(['success'=>'Item has been deleted from '.$item->product->name.' successfully']);
    }
    public function notificationBadge()
    {
        $ntf_badge_count = Order::where('is_seen', false)->count();
        return response()->json(['new_invoices_count' => $ntf_badge_count]);
    }
   
}