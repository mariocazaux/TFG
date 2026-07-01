import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';

export interface EventData {
  id: string;
  title: string;
  description: string;
  event_date: string;
  max_attendees: number;
  attendees: { count: number }[];
  organizer_id: string;
  organizer: { username: string; full_name: string; avatar_url: string };
  location_coords: { coordinates: [number, number] };
  isAttending?: boolean;
}

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './event-card.html',
  styleUrls: ['./event-card.scss'],
})
export class EventCardComponent {
  event = input.required<EventData>();
  currentUserId = input<string | null>(null);

  attend = output<EventData>();
  edit = output<EventData>();
  delete = output<EventData>();

  getAttendeesCount(): number {
    return this.event().attendees?.[0]?.count || 0;
  }

  isFull(): boolean {
    if (!this.event().max_attendees) {
      return false;
    }
    return this.getAttendeesCount() >= this.event().max_attendees;
  }

  canEditOrDelete(): boolean {
    return this.currentUserId() === this.event().organizer_id;
  }

  getPlaceholderImage(): string {
    return 'https://picsum.photos/seed/event/400/200';
  }
}
