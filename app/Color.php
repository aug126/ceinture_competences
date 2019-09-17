<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Color extends Model
{
    use SoftDeletes;
    //

    protected $fillable = ['skill_id', 'hexa_color', 'skill_level'];
}
