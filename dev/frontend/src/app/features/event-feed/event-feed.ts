import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { EventCardComponent, EventData } from '../../shared/components/event-card/event-card';

@Component({
  selector: 'app-event-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, EventCardComponent],
  templateUrl: './event-feed.html',
  styleUrls: ['./event-feed.scss'],
})
export class EventFeedComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  events: EventData[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<EventData[]>('http://localhost:3000/api/events').subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar los eventos próximos.';
        this.isLoading = false;
      },
    });
  }

  getAttendeesCount(event: EventData): number {
    return event.attendees?.[0]?.count || 0;
  }

  isFull(event: EventData): boolean {
    if (!event.max_attendees) {
      return false;
    }
    return this.getAttendeesCount(event) >= event.max_attendees;
  }

  attendEvent(event: EventData) {
    if (this.isFull(event)) {
      alert('El aforo para este evento está completo.');
      return;
    }

    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    this.http
      .post(`http://localhost:3000/api/events/${event.id}/attend`, {}, { headers })
      .subscribe({
        next: () => {
          alert('¡Te has apuntado al evento correctamente!');
          this.loadEvents(); // Recargar para actualizar el contador
        },
        error: (err) => {
          alert(err.error?.error || 'Hubo un problema al intentar apuntarte al evento.');
        },
      });
  }
}
