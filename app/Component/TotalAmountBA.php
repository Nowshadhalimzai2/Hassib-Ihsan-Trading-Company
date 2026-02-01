<?php

namespace App\Component;

use App\Models\Transaction;

class TotalAmountBA
{

    public function BABadget()
    {


        $total = Transaction::selectRaw('currencies.name, SUM(CASE
		WHEN transactions.source_id IS NULL
         THEN -transactions.amount
		ELSE transactions.amount
		END) as total',)->join('currencies', 'transactions.currency_id', '=', 'currencies.id')
            ->where(function ($q) {
                $q->where('business_account_id', 1);
            })->groupBy('currencies.name')
            ->pluck('total', 'name');

        return $total;
    }
}
