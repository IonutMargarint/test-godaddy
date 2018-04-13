@extends('layout')

@section('content')
    <form id="dns-form">
        <div class="js-dns-container">
            @foreach($dnsList as $dns)
                @include('dns.partials.single', ['dns' => $dns, 'exists' => 1])
            @endforeach
        </div>

        <button class="btn btn-info btn-sm js-add-new-dns" type="button">Add DNS Entry</button>
        <button class="btn btn-primary btn-sm js-save" type="button">Save</button>
    </form>
@endsection

@push('footer-scripts-stack')
    <script>
        window.Laravel.domainID = {{ $id }};
    </script>
    <script src="{{ asset('js/add-dns.js') }}"></script>
@endpush