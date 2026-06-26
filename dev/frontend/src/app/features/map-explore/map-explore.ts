import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';
// Se usa import dinámico o workaround para leaflet-routing-machine si falla en SSR
// ya que Leaflet manipula el DOM global.
// Para este entorno local, asumimos que se carga sin problema en el cliente.
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map-explore',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './map-explore.html',
  styleUrls: ['./map-explore.scss'],
})
export class MapExploreComponent implements AfterViewInit {
  @ViewChild('mapElement') mapElement!: ElementRef;
  private map!: L.Map;

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
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
  }
}
