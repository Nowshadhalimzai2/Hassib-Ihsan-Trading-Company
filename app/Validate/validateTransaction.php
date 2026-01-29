<?php

namespace App\Validate;

use App\Models\Transaction;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Integer;

class ValidateTransaction
{
    public $request = null;
    public function __construct(Request $request)
    {
        $this->request = $request;
    }
    private function storeRecord($transaction, $BA = null): void
    {
        $transaction->dealing_entity_id = (int)$this->request->entities['id'];
        $transaction->amount = $this->request->amount;
        $transaction->currency_id = $this->request->currency_id;
        $transaction->notes = $this->request->notes;
        $transaction->source_id = $this->request->source_id;
        $transaction->destination_id = $this->request->destination_id;
        $transaction->business_account_id = $BA;
        $transaction->save();
    }
    public function B2T($transaction): void
    {

        $this->request->validate([
            'amount' => 'required|numaric',
            'currency_id' => 'required|exists:currencies,id',
            'destination_id' => 'nullable|integer',
            'source_id' => 'nullable|integer',
            'entities.id' => 'required|integer:exists:dealing_entities,id',
            'notes' => 'nullable|string|min:10|max:200',
        ]);
        $this->storeRecord($transaction, BA: 1);
    }

    public function B2V($transaction)
    {

        // ---- VALIDATE FOR BUSINESS TO VENDOR ----
        $this->request->validate([
            'amount' => 'required|numeric',
            'currency_id' => 'required|exists:currencies,id',
            'destination_id' => 'nullable|integer',
            'source_id' => 'nullable|integer',
            'entities.id' => 'required|integer|exists:dealing_entities,id',
            'notes' => 'nullable|string|min:10|max:200',
        ]);
        $this->storeRecord($transaction, BA: 1);
    }
    public function T2V($transaction)
    {
        //  ---- VALIDATE FOR BUSINESS TO VENDOR ----
        $this->request->validate([
            'amount' => 'required|numeric',
            'currency_id' => 'required|exists:currencies,id',
            'destination_id' => 'required|integer',
            'source_id' => 'required|integer',
            'entities.id' => 'required|integer|exists:dealing_entities,id',
            'notes' => 'nullable|string|min:10|max:200',
        ]);
        $this->storeRecord($transaction);
    }
}
