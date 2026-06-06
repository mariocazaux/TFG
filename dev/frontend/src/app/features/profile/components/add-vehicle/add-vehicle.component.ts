import { Component, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-vehicle.html',
  styleUrls: ['./add-vehicle.scss'],
})
export class AddVehicleComponent {
  closed = output<void>();
  vehicleAdded = output<void>();

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  isSubmitting = signal(false);

  vehicleForm = this.fb.group({
    type: ['car', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    year: [
      new Date().getFullYear(),
      [Validators.required, Validators.min(1900), Validators.max(2100)],
    ],
  });

  setType(type: 'car' | 'motorcycle') {
    this.vehicleForm.patchValue({ type });
  }

  onClose() {
    this.closed.emit();
  }

  onSubmit() {
    if (this.vehicleForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    const payload = this.vehicleForm.value;

    this.http.post(`${environment.apiUrl}/vehicles`, payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.vehicleAdded.emit();
        this.closed.emit();
      },
      error: (err) => {
        console.error('Error al añadir vehículo:', err);
        this.isSubmitting.set(false);
        alert('Hubo un error al añadir el vehículo. Revisa la consola.');
      },
    });
  }
}
