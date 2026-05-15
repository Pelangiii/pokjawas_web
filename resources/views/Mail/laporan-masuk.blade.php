<?php

namespace App\Mail;

use App\Models\Laporan;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LaporanMasukMail extends Mailable
{
    use Queueable, SerializesModels;

    public $laporan;

    public function __construct(Laporan $laporan)
    {
        $this->laporan = $laporan;
    }

    public function build()
    {
        return $this->subject('Laporan Baru Masuk')
                    ->view('emails.laporan-masuk');
    }
}