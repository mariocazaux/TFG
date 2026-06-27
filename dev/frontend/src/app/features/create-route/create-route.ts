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

  routeForm!: FormGroup;
  private map!: L.Map;
  private routingControl!: L.Routing.Control;
  private waypoints: L.LatLng[] = [];

  isSaving = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit() {
    this.routeForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      vehicle_category: ['both', Validators.required],
      difficulty: ['medium', Validators.required],
    });
  }

  private platformId = inject(PLATFORM_ID);

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      await import('leaflet-routing-machine');
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

    // Configurar routing control sin waypoints inicialmente
    this.routingControl = L.Routing.control({
      waypoints: [],
      routeWhileDragging: true,
      show: false, // no mostrar panel de texto
      addWaypoints: false,
    }).addTo(this.map);

    // Al hacer click en el mapa, añadir waypoint
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.waypoints.push(e.latlng);
      this.routingControl.setWaypoints(this.waypoints);
    });

    // Fix map rendering issue on init
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
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

    // Extraer coordenadas de la ruta calculada por OSRM
    // routingControl.getRouter() devuelve la ruta, pero es asíncrono si lo forzamos.
    // La forma más segura es extraer los waypoints si confiamos en el straight line,
    // PERO como Leaflet Routing Machine ya ha dibujado la línea, podemos coger las coordenadas
    // del objeto route que nos da el evento 'routesfound'.

    // Para simplificar y asegurar que funciona, usaremos un truco:
    // Listen to the last calculated route
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const routes = (this.routingControl as any)._routes;
    let finalCoordinates: number[][];
    let distance = 0;

    if (routes && routes.length > 0) {
      const bestRoute = routes[0];
      distance = bestRoute.summary.totalDistance / 1000; // km
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      finalCoordinates = bestRoute.coordinates.map((c: any) => [c.lng, c.lat]);
    } else {
      // Fallback a los waypoints en línea recta si no hay ruta calculada
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

    this.http.post('http://localhost:3000/api/routes', payload, { headers }).subscribe({
      next: () => {
        this.isSaving = false;
        this.successMessage = 'Ruta creada con éxito.';
        this.clearRoute();
        this.routeForm.reset({ vehicle_category: 'both', difficulty: 'medium' });
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = err.error?.error || 'Error al guardar la ruta.';
      },
    });
  }
}
