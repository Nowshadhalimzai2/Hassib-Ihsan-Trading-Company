<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders=Order::with('user:id,name')->get();
        return Inertia::render('admin/Order/Index', compact('orders'));
    }
    public function show(Order $order)
    {
        $order->load(['orderItems.product','orderItems.product.images','user:id,name'])->get();
        return Inertia::render('admin/Order/Show', compact('order'));
    }
    public function confirm(Order $order, $status){
        $order->status = $status;
        $order->save();
        return redirect()->back();
        // return response()->json(['message' => 'Order ' . $status . ' with delivery time: ' ]);
    }
    public function delivery(Order $order, $time){
        $order->delivery_time = $time;
        $order->save();
        return response()->json(['message' => 'Order delivery time set to: ' . $time . ' hours']);
    }
    public function destroyItem(OrderItem $item){
    $item->delete();
        return response()->json(['success'=>'Item has been deleted from'.$item.' successfully']);
    }
}