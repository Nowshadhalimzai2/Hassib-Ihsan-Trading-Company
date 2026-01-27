<?php

namespace App\Validate;

use Illuminate\Http\Request;

class ValidateTransaction
{
    public $request = null;
    public function __construct(Request $request)
    {
        $this->request = $request;
    }
    public function B2T()
    {
        // dd('hit');
        $this->request->validate([
            'amount' => 'required|numeric',
            'currency_id' => 'required|exists:currencies,id',
            'destination_id' => 'required|integer',
            'business_account_id' => 'required|exists:businessAccount,id',
            'description' => 'nullable|string',
        ]);
    }

    public function B2V()
    {
        //  ----   VALIDATE FOR BUSINESS TO VENDOR ----
        $this->request->validate([
            'amount' => 'required|numeric',
            'currency_id' => 'required|exists:currencies,id',
            'destination_id' => 'required|integer|exists:destination,id',
            'business_account_id' => 'required|exists:businessAccount,id',
            'description' => 'nullable|string',
        ]);
    }
    public function T2V()
    {
        //  ----   VALIDATE FOR BUSINESS TO VENDOR ----
        $this->request->validate([
            'amount' => 'required|numeric',
            'currency_id' => 'required|exists:currencies,id',
            'source_id' => 'required|integer|exists:source,id',
            'destination_id' => 'required|integer|exists:destination,id',
            'business_account_id' => 'required|exists:businessAccount,id',
            'description' => 'nullable|string',
        ]);
    }
}