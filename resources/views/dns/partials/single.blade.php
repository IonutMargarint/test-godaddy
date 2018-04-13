<div class="row align-items-center js-dns-row-{{ $dns->id }}">
    <div class="col">
        <div class="form-group mb-2">
            <label for="Name">Name</label>
            <input type="text" class="form-control" id="Name" name="Name[]" value="{{ $dns->Name }}">
        </div>
    </div>

    <div class="col">
        <div class="form-group mb-2">
            <label for="Type">Type</label>
            <select name="Type[]" id="Type" class="form-control">
                @foreach(['A+AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT'] as $type)
                    <option value="{{ $type }}" {{ $type == $dns->Type ? 'selected' : ''}}>{{ $type }}</option>
                @endforeach
            </select>
        </div>
    </div>

    <div class="col">
        <div class="form-group mb-2">
            <label for="Value">IP</label>
            <input type="text" class="form-control js-ip" id="Value" name="Value[]" value="{{ $dns->Value }}">
        </div>
    </div>

    <div class="col">
        <div class="form-group mb-2 mt-4">
            <a href="javascript:;" class="btn btn-danger btn-sm js-delete-row" data-exists="{{ $exists }}" data-id="{{ $dns->id }}">Delete</a>
        </div>
    </div>
</div>