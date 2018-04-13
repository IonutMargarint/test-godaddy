@extends('layout')

@section('content')
    <form action="{{ route('domain-store') }}" method="post">
        {{ csrf_field() }}

        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label for="DomainName">Domain Name</label>
                    <input type="text" class="form-control {{ $errors->has('DomainName') ? 'is-invalid' : '' }}" id="DomainName" name="DomainName" value="{{ old('DomainName') }}">
                    @if ($errors->has('DomainName'))
                        <div class="invalid-feedback">{{ $errors->first('DomainName') }}</div>
                    @endif
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </form>
@endsection