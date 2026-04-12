<?php

namespace App\Http\Controllers;

use App\Models\BusinessAccount;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $req=null;
    public function index()
    {
        $payments = Payment::with(['invoice','invoice.order','invoice.order.user:id,name'])->get();
        // dd($payments);
        return Inertia::render('admin/payment/index', compact('payments'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {   
                
        return Inertia::render('admin/payment/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->req=$request;
        $this->req->validate([
            'invoice_number' => ['required','exists:invoices,invoice_number','startswith:INV-','min:4'],
            'amount' => 'required|numeric|gt:0',
            'notes' => 'nullable|string|max:255',
            'currency_id' => 'required|exists:currencies,id',
        ]);
        DB::beginTransaction();
        try{
              $ba=BusinessAccount::where('currency_id',$this->req->currency_id)->get()->first();
            $invoice_id=Invoice::where('invoice_number',$this->req->invoice_number)->pluck('id')->first();
            
            Payment::create([
                'invoice_id'=>$invoice_id,
                'user_id'=>Auth::id(),
                'payment_method_id'=>1,
                'amount'=>$this->req->amount,
                'notes'=>$this->req->notes,
                'payment_date'=>now(),
            ]);
            $ba->total_amount+=$this->req->amount;
            $ba->save();
            DB::commit();
        }
        catch(\Exception $e){
            DB::rollBack();
            throw $e;
        }
        return redirect(route('payments.index'))->with('success',"New Payment for invoice number ".$this->req->invoice_number." performed!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {   
        $payment->load(['invoice','invoice.order','invoice.order.user:id,name']);
        $payments=Payment::find($payment->id);
        return Inertia::render('admin/payment/show',compact('payment'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        $payment->load(['invoice','invoice.order','invoice.order.user:id,name']);
        return Inertia::render('admin/payment/edit',compact('payment'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        $this->req=$request;
        $this->req->validate([
            'invoice_number' => ['required','exists:invoices,invoice_number','startswith:INV-','min:4'],
            'amount' => 'required|numeric|gt:0',
            'notes' => 'nullable|string|max:255',
            'currency_id' => 'required|exists:currencies,id',
        ]);
        DB::beginTransaction();
        try{
            $ba=BusinessAccount::where('currency_id',$this->req->currency_id)->get()->first();
            $ba->total_amount-=$payment->amount;
            $ba->total_amount+=$this->req->amount;
            $invoice_id=Invoice::where('invoice_number',$this->req->invoice_number)->pluck('id')->first();
            $payment->invoice_id = $invoice_id;
            $payment->user_id=Auth::id();
            $payment->payment_method_id=1;
            $payment->amount=$this->req->amount;
            $payment->notes=$this->req->notes;
            $payment->payment_date=now();
            //10 +20 =30
            //15
            $payment->save();
            $ba->save();
            DB::commit();
        }
        catch(\Exception $e){
            DB::rollBack();
            throw $e;
        }
        return redirect(route('payments.index'))->with('success',"New Payment for invoice number ".$this->req->invoice_number." performed!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        DB::beginTransaction();
        try{
            $ba=BusinessAccount::where('currency_id',$payment->invoice->order->currency_id)->get()->first();
            $ba->total_amount-=$payment->amount;
            $ba->save();
            $payment->delete();
            DB::commit();
        }
        catch(\Exception $e){
            DB::rollBack();
            
            return redirect()->back()->with('error',"Failed to delete payment for Invoice Number. Re-trying might work! \n Error: ".$e->getMessage());
        }
        return redirect(route('payments.index'))->with('success',"Payment for Invoice Number ". $payment->invoice->invoice_number." Deleted Successfully!");
    }
    public function get_currency(String $invoice_number){
        
        // $order=Invoice::with(['order:id,currency_id,user','order.user:id,name'])->where('invoice_number',$invoice_number)->get()->pluck('order')->first();
        $invoice=Invoice::with(['order:id,currency_id,user_id','order.user:id,name'])->where('invoice_number',$invoice_number)->get()->pluck('order')->first();
        return response()->json($invoice);
    }
}