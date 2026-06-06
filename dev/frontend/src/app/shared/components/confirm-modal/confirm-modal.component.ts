import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrls: ['./confirm-modal.scss'],
})
export class ConfirmModalComponent {
  title = input<string>('Confirmar acción');
  message = input<string>('¿Estás seguro?');
  confirmText = input<string>('Confirmar');
  cancelText = input<string>('Cancelar');

  // Opcional: Para cambiar el color del botón (ej. 'red' para eliminar, 'cyan' para guardar)
  confirmColorClass = input<string>('button--cyan');

  confirmed = output<void>();
  canceled = output<void>();

  onConfirm() {
    this.confirmed.emit();
  }

  onCancel() {
    this.canceled.emit();
  }
}
