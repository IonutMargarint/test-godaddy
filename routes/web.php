<?php

Route::get('/', 'DomainsController@list')->name('domains-list');
Route::get('/add-domain', 'DomainsController@create')->name('domain-add');
Route::post('/add-domain', 'DomainsController@store')->name('domain-store');

Route::get('/add-dns/{id}', 'DnsController@list')->name('dns-add');
Route::post('/add-dns/{id}', 'DnsController@store');

Route::get('/get-new-dns-row', 'DnsController@newRow');
Route::get('/delete-dns-record/{id}', 'DnsController@destroy');

Route::post('/save-dns-records/{id}', 'DnsController@store');