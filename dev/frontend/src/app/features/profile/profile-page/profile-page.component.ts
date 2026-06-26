import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleCardComponent } from '../components/vehicle-card/vehicle-card.component';
import { AddVehicleComponent } from '../components/add-vehicle/add-vehicle.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Vehicle, BackendVehicle } from '../../../core/models/domain.models';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent, AddVehicleComponent, ConfirmModalComponent],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.scss'],
})
export class ProfilePageComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  userName = signal<string>('Usuario');
  userAvatar = signal<string>(
    'https://st4.depositphotos.com/12613638/38132/v/450/depositphotos_381327364-stock-illustration-vector-icon-eps-flat-design.jpg',
  );
  vehicles = signal<Vehicle[]>([]);
  isAddModalOpen = signal<boolean>(false);
  vehicleToEdit = signal<Vehicle | undefined>(undefined);

  // Estado para el modal de confirmación de eliminación
  vehicleToDelete = signal<Vehicle | undefined>(undefined);

  ngOnInit() {
    this.userName.set(this.authService.getUsername());
    this.loadVehicles();
  }

  loadVehicles() {
    this.http.get<{ vehicles: BackendVehicle[] }>(`${environment.apiUrl}/vehicles`).subscribe({
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
    this.vehicleToEdit.set(undefined);
    this.isAddModalOpen.set(true);
  }

  closeAddModal() {
    this.isAddModalOpen.set(false);
  }

  onEditVehicle(vehicle: Vehicle) {
    this.vehicleToEdit.set(vehicle);
    this.isAddModalOpen.set(true);
  }

  onDeleteVehicle(vehicle: Vehicle) {
    this.vehicleToDelete.set(vehicle);
  }

  cancelDelete() {
    this.vehicleToDelete.set(undefined);
  }

  confirmDelete() {
    const vehicle = this.vehicleToDelete();
    if (vehicle) {
      this.http.delete(`${environment.apiUrl}/vehicles/${vehicle.id}`).subscribe({
        next: () => {
          this.loadVehicles();
          this.vehicleToDelete.set(undefined);
        },
        error: (err) => {
          console.error('Error al eliminar vehículo:', err);
          alert('Error al eliminar el vehículo.');
          this.vehicleToDelete.set(undefined);
        },
      });
    }
  }

  async onAvatarSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      try {
        const token = this.authService.getToken();
        if (token) {
          const authSupabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
            global: {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          });
          const fileExt = file.name.split('.').pop();
          const fileName = `${new Date().getTime()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

          const { error: uploadError } = await authSupabase.storage
            .from('avatars')
            .upload(fileName, file);

          if (uploadError) {
            console.error('Error uploading avatar', uploadError);
            alert('Error al subir el avatar.');
            return;
          }

          const {
            data: { publicUrl },
          } = authSupabase.storage.from('avatars').getPublicUrl(fileName);
          this.userAvatar.set(publicUrl);

          // Actualizar el perfil en la base de datos (se requerirá un endpoint o hacerlo por supabase)
          // Como MVP, actualizaremos via Supabase directo usando el token
          const {
            data: { user },
          } = await authSupabase.auth.getUser();
          if (user) {
            await authSupabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
}
