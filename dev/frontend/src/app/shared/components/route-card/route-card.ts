import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';

export interface RouteData {
  id: string;
  title: string;
  description: string;
  vehicle_category: string;
  difficulty: string;
  distance_km: number;
  creator_id: string;
  creator: { username: string; full_name: string; avatar_url: string };
  created_at: string;
  path_coords?: { coordinates: [number, number][] };
}

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './route-card.html',
  styleUrls: ['./route-card.scss'],
})
export class RouteCardComponent {
  routeData = input.required<RouteData>();
  currentUserId = input<string | null>(null);

  edit = output<RouteData>();
  delete = output<RouteData>();

  canEditOrDelete(): boolean {
    return this.currentUserId() === this.routeData().creator_id;
  }

  getPlaceholderImage(): string {
    const category = this.routeData().vehicle_category?.toLowerCase();
    if (category === 'motorcycle') {
      return 'https://picsum.photos/seed/motorcycle/400/200';
    } else if (category === 'car') {
      return 'https://picsum.photos/seed/car/400/200';
    }
    return 'https://picsum.photos/seed/route/400/200';
  }
}
