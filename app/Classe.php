<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Classe extends Model
{
    use SoftDeletes;

    public function students() {
        return $this->hasMany('App\Student');
    }

    public function programs() {
        return $this->hasMany('App\Program');
    }

    public function skills() {
        return $this->hasManyThrough('App\Skill', 'App\Program');
    }
}
