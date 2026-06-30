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
import { RouteData } from '../../shared/components/route-card/route-card';
import { ButtonComponent } from '../../shared/components/button/button';
import { environment } from '../../../environments/environment';
import type * as L from 'leaflet';
@Component({
  selector: 'app-create-route',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent, ButtonComponent],
  templateUrl: './create-route.html',
  styleUrls: ['./create-route.scss'],
})
export class CreateRouteComponent implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapElement!: ElementRef;

  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  routeForm!: FormGroup;
  private map!: L.Map;
  private routingControl!: L.Routing.Control;
  private waypoints: L.LatLng[] = [];

  isSaving = false;
  successMessage = '';
  errorMessage = '';

  isEditMode = false;
  editRouteId: string | null = null;
  private loadedRouteData: RouteData | null = null;

  ngOnInit() {
    this.routeForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      vehicle_category: ['both', Validators.required],
      difficulty: ['medium', Validators.required],
    });

    this.editRouteId = this.route.snapshot.paramMap.get('id');
    if (this.editRouteId) {
      this.isEditMode = true;
      this.loadRouteData(this.editRouteId);
    }
  }

  private platformId = inject(PLATFORM_ID);

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      await import('leaflet-routing-machine');
      this.initMap(L);
    }
  }

  loadRouteData(id: string) {
    this.http.get<RouteData>(`${environment.apiUrl}/routes/${id}`).subscribe({
      next: (data) => {
        this.loadedRouteData = data;
        this.routeForm.patchValue({
          title: data.title,
          description: data.description,
          vehicle_category: data.vehicle_category,
          difficulty: data.difficulty,
        });

        if (this.routingControl && this.map) {
          this.drawLoadedRoute();
        }
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar la ruta para edición.';
      },
    });
  }

  private drawLoadedRoute() {
    if (
      !this.loadedRouteData ||
      !this.loadedRouteData.path_coords ||
      !this.loadedRouteData.path_coords.coordinates
    ) {
      return;
    }

    // GeoJSON is [lng, lat], Leaflet wants [lat, lng]
    // However, if we just take the first and last point to let OSRM recalculate, it might differ slightly,
    // but it's the easiest way to edit a route.
    // Or we can place all points as waypoints, but OSRM has a limit. Let's just pick a few key points (start, middle, end) if there are too many, or just first and last for simplicity.
    // To make it fully editable, we'll extract a few evenly spaced points (max 10).
    const coords = this.loadedRouteData.path_coords.coordinates;
    const numPoints = Math.min(coords.length, 10);
    const step = Math.max(1, Math.floor(coords.length / numPoints));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L;

    this.waypoints = [];
    for (let i = 0; i < coords.length; i += step) {
      this.waypoints.push(L.latLng(coords[i][1], coords[i][0]));
    }
    // Ensure last point is included
    if (coords.length > 0 && (coords.length - 1) % step !== 0) {
      const last = coords[coords.length - 1];
      this.waypoints.push(L.latLng(last[1], last[0]));
    }

    this.routingControl.setWaypoints(this.waypoints);

    if (this.waypoints.length > 0) {
      this.map.fitBounds(L.latLngBounds(this.waypoints));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initMap(L: any): void {
    const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
    const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
    const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.map = L.map(this.mapElement.nativeElement).setView([40.4168, -3.7038], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    this.routingControl = L.Routing.control({
      waypoints: [],
      routeWhileDragging: true,
      show: false,
      addWaypoints: false,
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.waypoints.push(e.latlng);
      this.routingControl.setWaypoints(this.waypoints);
    });

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
        if (this.loadedRouteData) {
          this.drawLoadedRoute();
        }
      }
    }, 100);
  }

  undoLastPoint() {
    this.waypoints.pop();
    this.routingControl.setWaypoints(this.waypoints);
  }

  clearRoute() {
    this.waypoints = [];
    this.routingControl.setWaypoints([]);
  }

  onSubmit() {
    if (this.routeForm.invalid) {
      this.errorMessage = 'Por favor, rellena los campos obligatorios.';
      return;
    }

    if (this.waypoints.length < 2) {
      this.errorMessage = 'Debes trazar al menos 2 puntos en el mapa.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const routes = (this.routingControl as any)._routes;
    let finalCoordinates: number[][];
    let distance = 0;

    if (routes && routes.length > 0) {
      const bestRoute = routes[0];
      distance = bestRoute.summary.totalDistance / 1000;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      finalCoordinates = bestRoute.coordinates.map((c: any) => [c.lng, c.lat]);
    } else {
      finalCoordinates = this.waypoints.map((wp) => [wp.lng, wp.lat]);
    }

    const payload = {
      ...this.routeForm.value,
      coordinates: finalCoordinates,
      distance_km: distance,
    };

    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const request = this.isEditMode
      ? this.http.put(`${environment.apiUrl}/routes/${this.editRouteId}`, payload, { headers })
      : this.http.post(`${environment.apiUrl}/routes`, payload, { headers });

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.successMessage = this.isEditMode
          ? 'Ruta actualizada con éxito.'
          : 'Ruta creada con éxito.';
        if (!this.isEditMode) {
          this.clearRoute();
          this.routeForm.reset({ vehicle_category: 'both', difficulty: 'medium' });
        }
        setTimeout(() => this.router.navigate(['/app/events']), 1500);
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = err.error?.error || 'Error al guardar la ruta.';
      },
    });
  }
}
