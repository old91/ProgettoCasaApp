<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AccessEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $surname;
    public $device;
    

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $surname, $device)
    {
        $this->name=$name;
        $this->surname=$surname;
        $this->device=$device;
        
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
                    ->subject('Tentativo di accesso NON AUTORIZZATO')
                    ->view('mail.access-email');
    }
}