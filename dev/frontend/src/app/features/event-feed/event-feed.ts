import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { EventCardComponent, EventData } from '../../shared/components/event-card/event-card';
import { ButtonComponent } from '../../shared/components/button/button';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, EventCardComponent, ButtonComponent],
  templateUrl: './event-feed.html',
  styleUrls: ['./event-feed.scss'],
})
export class EventFeedComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  events: EventData[] = [];
  errorMessage = '';

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<EventData[]>(`${environment.apiUrl}/events`).subscribe({
      next: (data) => {
        this.events = data;
      },
      error: () => {
        this.errorMessage = 'Error al cargar los eventos próximos.';
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
