<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Skill extends Model
{
    use SoftDeletes;

    public function colors() {
        return $this->hasMany('App\Color');
    }

    protected $fillable = ['skill_name', 'program_id'];
}
