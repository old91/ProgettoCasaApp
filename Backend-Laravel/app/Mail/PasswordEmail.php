<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $surname;
    public $password;
    

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $surname, $password)
    {
        $this->name=$name;
        $this->surname=$surname;
        $this->password=$password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
                    ->subject('Password di Registrazione')
                    ->view('mail.password-email');
    }
}
