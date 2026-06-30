import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { EventCardComponent, EventData } from '../../shared/components/event-card/event-card';
import { RouteCardComponent, RouteData } from '../../shared/components/route-card/route-card';
import { ButtonComponent } from '../../shared/components/button/button';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EventCardComponent,
    RouteCardComponent,
    ButtonComponent,
    ConfirmModalComponent,
  ],
  templateUrl: './event-feed.html',
  styleUrls: ['./event-feed.scss'],
})
export class EventFeedComponent implements OnInit {
  private http = inject(HttpClient);
  public authService = inject(AuthService);
  private router = inject(Router);

  activeTab = signal<'events' | 'routes'>('events');

  events: EventData[] = [];
  routes: RouteData[] = [];

  errorMessage = '';
  currentUserId: string | null = null;

  // Deletion state
  itemToDelete = signal<{ type: 'event' | 'route'; id: string; name: string } | null>(null);

  ngOnInit() {
    this.currentUserId = this.authService.getUserId();
    this.loadEvents();
    this.loadRoutes();
  }

  setTab(tab: 'events' | 'routes') {
    this.activeTab.set(tab);
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

  loadRoutes() {
    this.http.get<RouteData[]>(`${environment.apiUrl}/routes`).subscribe({
      next: (data) => {
        this.routes = data;
      },
      error: () => {
        this.errorMessage = 'Error al cargar las rutas.';
      },
    });
  }

  attendEvent(event: EventData) {
    const attendees = event.attendees?.[0]?.count || 0;
    if (event.max_attendees && attendees >= event.max_attendees) {
      alert('El aforo para este evento está completo.');
      return;
    }

    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    this.http.post(`${environment.apiUrl}/events/${event.id}/attend`, {}, { headers }).subscribe({
      next: () => {
        alert('¡Te has apuntado al evento correctamente!');
        this.loadEvents();
      },
      error: (err) => {
        alert(err.error?.error || 'Hubo un problema al intentar apuntarte al evento.');
      },
    });
  }

  onEditEvent(event: EventData) {
    this.router.navigate(['/app/edit-event', event.id]);
  }

  onEditRoute(route: RouteData) {
    this.router.navigate(['/app/edit-route', route.id]);
  }

  requestDeleteEvent(event: EventData) {
    this.itemToDelete.set({ type: 'event', id: event.id, name: event.title });
  }

  requestDeleteRoute(route: RouteData) {
    this.itemToDelete.set({ type: 'route', id: route.id, name: route.title });
  }

  confirmDelete() {
    const item = this.itemToDelete();
    if (!item) {
      return;
    }

    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    if (item.type === 'event') {
      this.http.delete(`${environment.apiUrl}/events/${item.id}`, { headers }).subscribe({
        next: () => {
          this.loadEvents();
          this.itemToDelete.set(null);
        },
        error: (err) => {
          alert(err.error?.error || 'Error borrando evento');
        },
      });
    } else {
      this.http.delete(`${environment.apiUrl}/routes/${item.id}`, { headers }).subscribe({
        next: () => {
          this.loadRoutes();
          this.itemToDelete.set(null);
        },
        error: (err) => {
          alert(err.error?.error || 'Error borrando ruta');
        },
      });
    }
  }

  cancelDelete() {
    this.itemToDelete.set(null);
  }
}
