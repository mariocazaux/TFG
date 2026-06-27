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
import { AuthService } from '../../core/services/auth.service';
import { FormInputComponent } from '../../shared/components/form-input/form-input';
import { ButtonComponent } from '../../shared/components/button/button';
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

  eventForm!: FormGroup;
  private map!: L.Map;
  private currentMarker: L.Marker | null = null;
  private selectedLocation: [number, number] | null = null;

  isSaving = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      event_date: ['', Validators.required],
      max_attendees: [50, [Validators.required, Validators.min(1)]],
    });
  }

  private platformId = inject(PLATFORM_ID);

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      this.initMap(L);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initMap(L: any): void {
    this.map = L.map(this.mapElement.nativeElement).setView([40.4168, -3.7038], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    // Ajuste de icono
    const iconDefault = L.icon({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;

    // Colocar un Pin al hacer clic
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }
      this.currentMarker = L.marker(e.latlng).addTo(this.map);
      this.selectedLocation = [e.latlng.lng, e.latlng.lat];
    });

    // Fix map rendering issue on init
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
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

  private async setMarker(lat: number, lng: number) {
    if (!this.map) {
      return;
    }
    const L = await import('leaflet');

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

    this.http.post('http://localhost:3000/api/events', payload, { headers }).subscribe({
      next: () => {
        this.isSaving = false;
        this.successMessage = 'Quedada creada con éxito.';
        this.clearPin();
        this.eventForm.reset({ max_attendees: 50 });
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = err.error?.error || 'Error al guardar el evento.';
      },
    });
  }
}
