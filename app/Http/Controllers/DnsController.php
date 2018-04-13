<?php

namespace App\Http\Controllers;

use App\Models\DomainDns;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class DnsController extends Controller
{
    /**
     * @param int $id
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function list($id)
    {
        $dnsList = DomainDns::where(['DomainID' => $id])->get();
        return view('dns.list', compact('dnsList', 'id'));
    }

    /**
     * @return Response
     */
    public function newRow()
    {
        $dns = new \stdClass();
        $dns->id = 0;
        $dns->DomainID = 0;
        $dns->Name = '';
        $dns->Type = '';
        $dns->Value = '';

        $response = [
            'html' => ''.view('dns.partials.single', ['dns' => $dns, 'exists' => 0]),
        ];

        return new Response(json_encode($response), 200, [
            'Content-Type' => 'application/json'
        ]);
    }

    /**
     * @param int     $id
     * @param Request $request
     *
     * @return Response
     */
    public function store($id, Request $request)
    {
        try {
            DB::table('DomainDNS')->where(['DomainID' => $id])->delete();
        } catch (\Exception $ex) {
            return new Response(json_encode(["message" => $ex->getMessage()]), 500, [
                'Content-Type' => 'application/json'
            ]);
        }


        $name = $request->Name;
        $type = $request->Type;
        $value = $request->Value;

        try {
            foreach ($name as $idx => $row) {
                $row = [
                    'DomainID' => $id,
                    'Name' => $name[$idx],
                    'Type' => $type[$idx],
                    'Value' => $value[$idx],
                ];

                DomainDns::create($row);
            }
        } catch (\Exception $ex) {
            return new Response(json_encode(["message" => $ex->getMessage()]), 500, [
                'Content-Type' => 'application/json'
            ]);
        }

        $response = [
            'message' => "All records have been saved."
        ];
        return new Response(json_encode($response), 200, [
            'Content-Type' => 'application/json'
        ]);
    }

    /**
     * @param int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $dns = DomainDns::find($id);

        $code = 200;

        try {
            $dns->delete();
            $message = "DNS record has been deleted.";
        } catch (\Exception $ex) {
            $message = $ex->getMessage();
            $code = 500;
        }

        return new Response(json_encode(['message' => $message]), $code, [
            'Content-Type' => 'application/json'
        ]);
    }
}
