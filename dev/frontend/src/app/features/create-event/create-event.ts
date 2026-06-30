import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormInputComponent } from '../../shared/components/form-input/form-input';
import { EventData } from '../../shared/components/event-card/event-card';
import { ButtonComponent } from '../../shared/components/button/button';
import { environment } from '../../../environments/environment';
import type * as L from 'leaflet';
@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent, ButtonComponent],
  templateUrl: './create-event.html',
  styleUrls: ['./create-event.scss'],
})
export class CreateEventComponent implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapElement!: ElementRef;

  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  eventForm!: FormGroup;
  private map!: L.Map;
  private currentMarker: L.Marker | null = null;
  private selectedLocation: [number, number] | null = null;

  isSaving = false;
  successMessage = '';
  errorMessage = '';

  isEditMode = false;
  editEventId: string | null = null;
  private loadedEventData: EventData | null = null;

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      event_date: ['', Validators.required],
      max_attendees: [50, [Validators.required, Validators.min(1)]],
    });

    this.editEventId = this.route.snapshot.paramMap.get('id');
    if (this.editEventId) {
      this.isEditMode = true;
      this.loadEventData(this.editEventId);
    }
  }

  private platformId = inject(PLATFORM_ID);

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      this.initMap(L);
    }
  }

  loadEventData(id: string) {
    this.http.get<EventData>(`${environment.apiUrl}/events/${id}`).subscribe({
      next: (data) => {
        this.loadedEventData = data;

        // Formatear la fecha para input type="datetime-local" (YYYY-MM-DDThh:mm)
        let formattedDate = '';
        if (data.event_date) {
          const dateObj = new Date(data.event_date);
          const isoString = dateObj.toISOString();
          formattedDate = isoString.substring(0, 16);
        }

        this.eventForm.patchValue({
          title: data.title,
          description: data.description,
          event_date: formattedDate,
          max_attendees: data.max_attendees,
        });

        if (this.map) {
          this.drawLoadedEvent();
        }
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar la quedada para edición.';
      },
    });
  }

  private drawLoadedEvent() {
    if (
      !this.loadedEventData ||
      !this.loadedEventData.location_coords ||
      !this.loadedEventData.location_coords.coordinates
    ) {
      return;
    }

    // GeoJSON is [lng, lat]
    const coords = this.loadedEventData.location_coords.coordinates;
    const lng = coords[0];
    const lat = coords[1];

    this.setMarker(lat, lng);
    this.map.setView([lat, lng], 14);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initMap(L: any): void {
    this.map = L.map(this.mapElement.nativeElement).setView([40.4168, -3.7038], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    const iconDefault = L.icon({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }
      this.currentMarker = L.marker(e.latlng).addTo(this.map);
      this.selectedLocation = [e.latlng.lng, e.latlng.lat];
    });

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
        if (this.loadedEventData) {
          this.drawLoadedEvent();
        }
      }
    }, 100);
  }

  clearPin() {
    if (this.currentMarker && this.map) {
      this.map.removeLayer(this.currentMarker);
      this.currentMarker = null;
      this.selectedLocation = null;
    }
  }

  private setMarker(lat: number, lng: number) {
    if (!this.map) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L;

    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }
    this.currentMarker = L.marker([lat, lng]).addTo(this.map);
    this.selectedLocation = [lng, lat];
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      this.errorMessage = 'Por favor, rellena todos los campos obligatorios.';
      return;
    }

    if (!this.selectedLocation) {
      this.errorMessage = 'Debes seleccionar la ubicación en el mapa (soltar un Pin).';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      ...this.eventForm.value,
      location: this.selectedLocation,
    };

    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    const request = this.isEditMode
      ? this.http.put(`${environment.apiUrl}/events/${this.editEventId}`, payload, { headers })
      : this.http.post(`${environment.apiUrl}/events`, payload, { headers });

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.successMessage = this.isEditMode
          ? 'Quedada actualizada con éxito.'
          : 'Quedada creada con éxito.';
        if (!this.isEditMode) {
          this.clearPin();
          this.eventForm.reset({ max_attendees: 50 });
        }
        setTimeout(() => this.router.navigate(['/app/events']), 1500);
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = err.error?.error || 'Error al guardar el evento.';
      },
    });
  }
}
