<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\PerformanceActionPlan;
use App\Models\User;

class PerformanceActionPlanAssigned extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(PerformanceActionPlan $actionPlan, User $trigger)
    {
        $this->actionPlan = $actionPlan;
        $this->trigger = $trigger;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'trigger' => [
                'id' => $this->trigger->id,
                'name' => $this->trigger->name,
                'photo' => $this->trigger->photo,
            ],
            'type' => config('enums.notification_types.performance_monitoring_action_plan'),
            'title' => $this->trigger->name.' menjadikan Anda PIC '.__('titles.performance_monitoring_action_plan'),
            'description' => $this->actionPlan->description,
        ];
    }
}
