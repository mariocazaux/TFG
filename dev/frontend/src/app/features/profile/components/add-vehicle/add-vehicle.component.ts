import { Component, output, input, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Vehicle, BackendVehicle, VehicleType } from '../../../../core/models/domain.models';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-vehicle.html',
  styleUrls: ['./add-vehicle.scss'],
})
export class AddVehicleComponent implements OnInit {
  closed = output<void>();
  vehicleAdded = output<void>();

  vehicleToEdit = input<Vehicle | undefined>();

  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private supabase: SupabaseClient;

  isSubmitting = signal(false);
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  vehicleForm = this.fb.group({
    type: ['car', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    year: [
      new Date().getFullYear(),
      [Validators.required, Validators.min(1900), Validators.max(2100)],
    ],
    color: [''],
    engine_specs: [''],
    displacement_cc: [null as number | null],
  });

  ngOnInit() {
    const editData = this.vehicleToEdit();
    if (editData) {
      this.vehicleForm.patchValue({
        type: editData.type,
        brand: editData.brand,
        model: editData.model,
        year: editData.year,
        color: editData.color || '',
        engine_specs: editData.engineSpecs || '',
        displacement_cc: editData.displacementCc || null,
      });
      if (editData.mainImageUrl) {
        this.imagePreview = editData.mainImageUrl;
      }
    }

    // Manage validation for displacement conditionally
    this.vehicleForm.get('type')?.valueChanges.subscribe((type) => {
      const displacementControl = this.vehicleForm.get('displacement_cc');
      if (type === 'motorcycle') {
        displacementControl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        displacementControl?.clearValidators();
        displacementControl?.setValue(null);
      }
      displacementControl?.updateValueAndValidity();
    });
  }

  setType(type: 'car' | 'motorcycle') {
    this.vehicleForm.patchValue({ type });
  }

  onClose() {
    this.closed.emit();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getSelectedColorHex(): string {
    const colorName = this.vehicleForm.get('color')?.value;
    const colorMap: Record<string, string> = {
      rojo: '#ef4444',
      azul: '#3b82f6',
      verde: '#22c55e',
      negro: '#000000',
      blanco: '#ffffff',
      amarillo: '#eab308',
      plata: '#9ca3af',
      gris: '#6b7280',
    };
    return colorMap[colorName || ''] || 'transparent';
  }

  async onSubmit() {
    if (this.vehicleForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    const formValue = this.vehicleForm.value;
    const payload: Partial<BackendVehicle> = {
      type: formValue.type as VehicleType,
      brand: formValue.brand || '',
      model: formValue.model || '',
      year: formValue.year || new Date().getFullYear(),
      color: formValue.color || undefined,
      engine_specs: formValue.engine_specs || undefined,
      displacement_cc: formValue.displacement_cc || undefined,
    };

    try {
      if (this.selectedFile) {
        const token = this.authService.getToken();
        if (token) {
          const authSupabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
            global: {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          });
          const fileExt = this.selectedFile.name.split('.').pop();
          const fileName = `${new Date().getTime()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await authSupabase.storage
            .from('vehicles')
            .upload(filePath, this.selectedFile);

          if (uploadError) {
            console.error('Error uploading image', uploadError);
            throw uploadError;
          }

          const {
            data: { publicUrl },
          } = authSupabase.storage.from('vehicles').getPublicUrl(filePath);
          payload.main_image_url = publicUrl;
        }
      }

      const editData = this.vehicleToEdit();
      if (editData) {
        this.http.put(`${environment.apiUrl}/vehicles/${editData.id}`, payload).subscribe({
          next: () => {
            this.isSubmitting.set(false);
            this.vehicleAdded.emit();
            this.closed.emit();
          },
          error: this.handleError.bind(this),
        });
      } else {
        this.http.post(`${environment.apiUrl}/vehicles`, payload).subscribe({
          next: () => {
            this.isSubmitting.set(false);
            this.vehicleAdded.emit();
            this.closed.emit();
          },
          error: this.handleError.bind(this),
        });
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(err: unknown) {
    console.error('Error:', err);
    this.isSubmitting.set(false);
    alert('Hubo un error al guardar el vehículo. Revisa la consola.');
  }
}
