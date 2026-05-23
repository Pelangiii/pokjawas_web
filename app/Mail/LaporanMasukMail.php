<?php

namespace App\Mail; // 1. PASTIKAN namespace menggunakan 'Mail' (M kapital)

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LaporanMasukMail extends Mailable // 2. PASTIKAN nama class persis sama dengan nama file
{
    use Queueable, SerializesModels;

    // ... isi mailable Anda
}