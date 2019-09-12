<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use SoftDeletes;

    public function classe() {
        return $this->belongsTo('App\Classe');
    }

    public function updates() {
        return $this->hasMany('App\Update');
    }
    protected $fillable = ['order_number', 'student_name', 'classe_id'];
}
