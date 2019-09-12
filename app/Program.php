<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Program extends Model
{
    use SoftDeletes;

    // public function classe() {
    //     return $this->belongsTo('App\Classe');
    // }

    public function skills() {
        return $this->hasMany('App\Skill');
    }
    protected $fillable = ['program_name', 'classe_id'];
}
