<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends ResetPassword
{
    public function toMail($notifiable)
    {
        $url = url("/reset-password?token={$this->token}&email={$notifiable->getEmailForPasswordReset()}");

        return (new MailMessage)
            ->subject('Obnovenie hesla')
            ->line('Klikni na tlačidlo nižšie pre obnovu hesla.')
            ->action('Obnoviť heslo', $url)
            ->line('Ak si si heslo nežiadaš obnoviť, ignoruj tento e-mail.');
    }
}
