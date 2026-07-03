import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
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

  events = signal<EventData[]>([]);
  routes = signal<RouteData[]>([]);

  // Filters for Events
  eventDateFilter = signal<string>('');
  eventPlaceFilter = signal<string>('');

  // Filters for Routes
  routeDifficultyFilter = signal<string>('');
  routeMaxKmFilter = signal<string>('');

  errorMessage = signal<string>('');
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

  applyEventFilters(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.loadEvents();
  }

  applyRouteFilters(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.loadRoutes();
  }

  clearEventFilters() {
    this.eventDateFilter.set('');
    this.eventPlaceFilter.set('');
    this.loadEvents();
  }

  clearRouteFilters() {
    this.routeDifficultyFilter.set('');
    this.routeMaxKmFilter.set('');
    this.loadRoutes();
  }

  loadEvents() {
    let url = `${environment.apiUrl}/events?_t=${Date.now()}`;
    const date = this.eventDateFilter();
    const place = this.eventPlaceFilter();
    if (date) {
      url += `&date=${encodeURIComponent(date)}`;
    }
    if (place) {
      url += `&place=${encodeURIComponent(place)}`;
    }

    this.http.get<EventData[]>(url).subscribe({
      next: (events) => {
        if (this.currentUserId) {
          const token = this.authService.getToken();
          const headers = { Authorization: `Bearer ${token}` };
          this.http
            .get<string[]>(`${environment.apiUrl}/events/my-attendances`, { headers })
            .subscribe({
              next: (attendances) => {
                const attendedSet = new Set(attendances);
                events.forEach((e) => (e.isAttending = attendedSet.has(e.id)));
                this.events.set(events);
              },
              error: () => this.events.set(events),
            });
        } else {
          this.events.set(events);
        }
      },
      error: () => {
        this.errorMessage.set('Error al cargar los eventos próximos.');
      },
    });
  }

  loadRoutes() {
    let url = `${environment.apiUrl}/routes?_t=${Date.now()}`;
    const diff = this.routeDifficultyFilter();
    const km = this.routeMaxKmFilter();
    if (diff) {
      url += `&difficulty=${encodeURIComponent(diff)}`;
    }
    if (km) {
      url += `&max_km=${encodeURIComponent(km)}`;
    }

    this.http.get<RouteData[]>(url).subscribe({
      next: (routes) => {
        if (this.currentUserId) {
          const token = this.authService.getToken();
          const headers = { Authorization: `Bearer ${token}` };
          this.http
            .get<string[]>(`${environment.apiUrl}/routes/my-bookmarks`, { headers })
            .subscribe({
              next: (bookmarks) => {
                const bookmarkSet = new Set(bookmarks);
                routes.forEach((r) => (r.isBookmarked = bookmarkSet.has(r.id)));
                this.routes.set(routes);
              },
              error: () => this.routes.set(routes),
            });
        } else {
          this.routes.set(routes);
        }
      },
      error: () => {
        this.errorMessage.set('Error al cargar las rutas.');
      },
    });
  }

  attendEvent(event: EventData) {
    if (!this.currentUserId) {
      alert('Debes iniciar sesión para apuntarte.');
      return;
    }

    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    if (event.isAttending) {
      // Unattend
      this.http.delete(`${environment.apiUrl}/events/${event.id}/attend`, { headers }).subscribe({
        next: () => {
          this.events.update((events) =>
            events.map((e) => {
              if (e.id === event.id) {
                return {
                  ...e,
                  isAttending: false,
                  attendees: [{ count: Math.max(0, (e.attendees?.[0]?.count || 0) - 1) }],
                };
              }
              return e;
            }),
          );
        },
        error: (err) => {
          alert(err.error?.error || 'Hubo un problema al cancelar asistencia.');
        },
      });
    } else {
      // Attend
      const attendees = event.attendees?.[0]?.count || 0;
      if (event.max_attendees && attendees >= event.max_attendees) {
        alert('El aforo para este evento está completo.');
        return;
      }
      this.http.post(`${environment.apiUrl}/events/${event.id}/attend`, {}, { headers }).subscribe({
        next: () => {
          this.events.update((events) =>
            events.map((e) => {
              if (e.id === event.id) {
                return {
                  ...e,
                  isAttending: true,
                  attendees: [{ count: (e.attendees?.[0]?.count || 0) + 1 }],
                };
              }
              return e;
            }),
          );
        },
        error: (err) => {
          alert(err.error?.error || 'Hubo un problema al intentar apuntarte al evento.');
        },
      });
    }
  }

  bookmarkRoute(route: RouteData) {
    if (!this.currentUserId) {
      alert('Debes iniciar sesión para guardar.');
      return;
    }

    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    if (route.isBookmarked) {
      // Unbookmark
      this.http.delete(`${environment.apiUrl}/routes/${route.id}/bookmark`, { headers }).subscribe({
        next: () => {
          this.routes.update((routes) =>
            routes.map((r) => (r.id === route.id ? { ...r, isBookmarked: false } : r)),
          );
        },
        error: (err) => {
          alert(err.error?.error || 'Hubo un problema al quitar de guardados.');
        },
      });
    } else {
      // Bookmark
      this.http
        .post(`${environment.apiUrl}/routes/${route.id}/bookmark`, {}, { headers })
        .subscribe({
          next: () => {
            this.routes.update((routes) =>
              routes.map((r) => (r.id === route.id ? { ...r, isBookmarked: true } : r)),
            );
          },
          error: (err) => {
            alert(err.error?.error || 'Hubo un problema al guardar ruta.');
          },
        });
    }
  }

  onEditEvent(event: EventData) {
    this.router.navigate(['/app/create-event', event.id]);
  }

  onEditRoute(route: RouteData) {
    this.router.navigate(['/app/create-route', route.id]);
  }

  onViewProfile(userId: string) {
    this.router.navigate(['/app/user', userId]);
  }

  onFollowUser(userId: string) {
    if (!this.currentUserId) {
      alert('Debes iniciar sesión para seguir a usuarios.');
      return;
    }

    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    this.http.post(`${environment.apiUrl}/users/${userId}/follow`, {}, { headers }).subscribe({
      next: () => {
        alert('Has seguido al usuario exitosamente.');
      },
      error: (err) => {
        if (err.status === 200) {
          alert('Ya sigues a este usuario.');
        } else {
          console.error('Error following user:', err);
          alert('Hubo un error al intentar seguir al usuario.');
        }
      },
    });
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
