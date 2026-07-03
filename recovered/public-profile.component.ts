import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ButtonComponent } from '../../../../shared/components/button/button';

interface PublicProfile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  isFollowing: boolean;
  followersCount: number;
}

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './public-profile.html',
  styleUrls: ['./public-profile.scss'],
})
export class PublicProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  profile = signal<PublicProfile | null>(null);
  isLoading = signal<boolean>(true);
  errorMsg = signal<string>('');
  isTogglingFollow = signal<boolean>(false);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadProfile(id);
      } else {
        this.errorMsg.set('ID de usuario no proporcionado');
        this.isLoading.set(false);
      }
    });
  }

  loadProfile(userId: string) {
    this.isLoading.set(true);
    this.http.get<PublicProfile>(`${environment.apiUrl}/users/${userId}/profile`).subscribe({
      next: (data) => {
        this.profile.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
        this.errorMsg.set('No se ha podido cargar el perfil');
        this.isLoading.set(false);
      }
    });
  }

  toggleFollow() {
    const currentProfile = this.profile();
    if (!currentProfile || this.isTogglingFollow()) return;

    this.isTogglingFollow.set(true);

    if (currentProfile.isFollowing) {
      this.http.delete(`${environment.apiUrl}/users/${currentProfile.id}/follow`).subscribe({
        next: () => {
          this.profile.update(p => p ? { ...p, isFollowing: false, followersCount: p.followersCount - 1 } : p);
          this.isTogglingFollow.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isTogglingFollow.set(false);
        }
      });
    } else {
      this.http.post(`${environment.apiUrl}/users/${currentProfile.id}/follow`, {}).subscribe({
        next: () => {
          this.profile.update(p => p ? { ...p, isFollowing: true, followersCount: p.followersCount + 1 } : p);
          this.isTogglingFollow.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isTogglingFollow.set(false);
        }
      });
    }
  }
}
