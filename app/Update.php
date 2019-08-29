<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Update extends Model
{
    use SoftDeletes;

    public function student() {
        return $this->belongsTo('App\Student');
    }
}
