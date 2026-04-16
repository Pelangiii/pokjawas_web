<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    // INI WAJIB ADA karena nama tabel lu 'berita' bukan 'beritas'
    protected $table = 'berita';

    protected $fillable = [
        'judul',
        'isi',
        'kategori',
        'gambar',
    ];
}