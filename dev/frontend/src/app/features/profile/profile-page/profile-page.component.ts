import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleCardComponent } from '../components/vehicle-card/vehicle-card.component';
import { AddVehicleComponent } from '../components/add-vehicle/add-vehicle.component';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Vehicle } from '../../../core/models/domain.models';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent, AddVehicleComponent],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.scss'],
})
export class ProfilePageComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  userName = signal<string>('Usuario');
  vehicles = signal<Vehicle[]>([]);
  isAddModalOpen = signal<boolean>(false);

  ngOnInit() {
    this.userName.set(this.authService.getUsername());
    this.loadVehicles();
  }

  loadVehicles() {
    this.http.get<{ vehicles: any[] }>(`${environment.apiUrl}/vehicles`).subscribe({
      next: (response) => {
        const mappedVehicles: Vehicle[] = response.vehicles.map((v) => ({
          ...v,
          ownerId: v.owner_id,
          displacementCc: v.displacement_cc,
          engineSpecs: v.engine_specs,
          mainImageUrl: v.main_image_url,
          createdAt: v.created_at,
        }));
        this.vehicles.set(mappedVehicles);
      },
      error: (error) => {
        console.error('Error cargando vehículos:', error);
        this.vehicles.set([]);
      },
    });
  }

  openAddModal() {
    this.isAddModalOpen.set(true);
  }

  closeAddModal() {
    this.isAddModalOpen.set(false);
  }
}
