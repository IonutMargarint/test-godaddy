@extends('layout')

@section('content')
    <a href="{{ route('domain-add') }}" class="btn btn-primary btn-sm float-right mt-3">Add Domain</a>
    <h1>List domains</h1>

    @if (!count($domains))
        <p>No domains were added yet.</p>
    @else
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <tr>
                    <th>DomainID</th>
                    <th>DomainName</th>
                    <th>Actions</th>
                </tr>
                @foreach($domains as $key => $domain)
                    <tr>
                        <td>{{ $domain->DomainID }}</td>
                        <td>{{ $domain->DomainName }}</td>
                        <td>
                            <a href="{{ route('dns-add', ['id' => $domain->DomainID]) }}" class="btn btn-info btn-sm">Add DNS</a>
                        </td>
                    </tr>
                @endforeach
            </table>

            {{ count($domains) > 0 ? $domains->links() : '' }}
        </div>
    @endif
@endsection