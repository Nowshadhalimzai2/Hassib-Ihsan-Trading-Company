<?php

namespace App\Validate;

use App\Component\TotalAmountBA;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\Integer;

class ValidateTransaction
{
    public $request = null;
    private function isBAGreeater($amount)
    {
        if ($this->request->source_id == null) {
            $BAbadget = new TotalAmountBA;
            $total = null;
            if ($this->request->currency_id == 1) {
                try {
                    $total = $BAbadget->BABadget()['Afg'];
                } catch (Exception) {
                    $total = 0;
                }
            } else if ($this->request->currency_id == 2) {
                try {
                    $total = $BAbadget->BABadget()['Pak'];
                } catch (Exception) {
                    $total = 0;
                }
            } else {

                try {
                    $total = $BAbadget->BABadget()['USD'];
                } catch (Exception) {
                    $total = 0;
                }
            }

            return $total >= $amount;
        }
    }
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
    public function B2T($transaction): bool
    {

        $this->request->validate([
            'amount' => 'required|numeric',
            'currency_id' => 'required|exists:currencies,id',
            'destination_id' => 'nullable|integer',
            'source_id' => 'nullable|integer',
            'entities.id' => 'required|integer:exists:dealing_entities,id',
            'notes' => 'nullable|string|min:10|max:200',
        ]);

        // if Business Account amount is less than the selected to be withdrwal
        if (!$this->isBAGreeater($this->request->amount) && $this->request->source_id == null) {
            return false;
        }

        $this->storeRecord($transaction, BA: 1);
        return true;
    }

    public function B2V($transaction): bool
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
        if (!$this->isBAGreeater($this->request->amount)) {
            return false;
        }
        $this->storeRecord($transaction, BA: 1);
        return true;
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
