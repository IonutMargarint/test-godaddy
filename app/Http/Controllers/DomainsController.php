<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddDomainRequest;
use App\Models\DomainName;

class DomainsController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function list()
    {
        $domains = DomainName::paginate(20);
        return view('domains.list', compact('domains'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        return view('domains.create');
    }

    /**
     * @param AddDomainRequest $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(AddDomainRequest $request)
    {
        DomainName::create([
            'DomainName' => $request->DomainName
        ]);

        return redirect(route('domains-list'));
    }
}
