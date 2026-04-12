<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function store(Request $request){
       if(!$request->validate([
        'order_id'=>'required|unique:invoices,order_id|exists:orders,id',
       ])){
           return Response()->json(['error'=>'Invalid order ID or invoice already exists for this order'], 400);
       }
       $invoice_number='INV-'.Invoice::max('id')+1;
       $invoice=Invoice::create([
           'order_id'=>$request->order_id,
           'invoice_number'=>$invoice_number,
           'invoice_date'=>now(),
           ]);
return Response()->json(['success'=>'Invoice created successfully', 'invoice'=>$invoice], 201);
    }
    public function show(Order $order){
        $order->load(['orderItems.product','orderItems','user:id,name'])->get();
        // $is_invoice_exists=Invoice::where('order_id',$order->id)->exists();
        // if($is_invoice_exists)
        //     $invoice_number=Invoice::where('order_id',$order->id)->pluck('invoice_number')->first();
        // else
        //     $invoice_number='INV-'.Invoice::max('id')+1;
        return Inertia::render('admin/invoice/Show', compact(['order', 'invoice_number','is_invoice_exists']));
    }
    public function orderInvoiceShow(Order $order):Response{
        $order->load(['orderItems.product','orderItems','user:id,name'])->get();
         $is_invoice_exists=Invoice::where('order_id',$order->id)->exists();
        if($is_invoice_exists)
            $invoice_number=Invoice::where('order_id',$order->id)->pluck('invoice_number')->first();
        else
            $invoice_number='INV-'.Invoice::max('id')+1;
        
        return Inertia::render('admin/invoice/Show', compact(['order', 'invoice_number','is_invoice_exists']));
        
    }
}