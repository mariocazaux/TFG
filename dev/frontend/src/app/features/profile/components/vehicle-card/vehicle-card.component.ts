import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../../core/models/domain.models';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card.html',
  styleUrls: ['./vehicle-card.scss'],
})
export class VehicleCardComponent {
  vehicle = input.required<Vehicle>();
}
