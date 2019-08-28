<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    public function skills() {
        return $this->hasMany('App\Skill');
    }
}
