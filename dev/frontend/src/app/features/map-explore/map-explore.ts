import { isPlatformBrowser, CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button';
import type * as L from 'leaflet';

@Component({
  selector: 'app-map-explore',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './map-explore.html',
  styleUrls: ['./map-explore.scss'],
})
export class MapExploreComponent implements AfterViewInit {
  @ViewChild('mapElement') mapElement!: ElementRef;
  private map!: L.Map;
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
    // Configuración inicial del mapa de Leaflet
    this.map = L.map(this.mapElement.nativeElement).setView([40.4168, -3.7038], 6); // Madrid por defecto

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    // Ajuste de los iconos por defecto de Leaflet que fallan en Angular
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
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

    // Fix map rendering issue on init
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }
}
