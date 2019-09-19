@extends('layouts.app')

@section('content')
<div id="app-login">
    <vue-login login-url="{{ route('login') }}"> </vue-login>
</div>
@endsection