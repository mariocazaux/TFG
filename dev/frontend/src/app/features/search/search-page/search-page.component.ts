import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ButtonComponent } from '../../../shared/components/button/button';

interface UserSearchResult {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.scss'],
})
export class SearchPageComponent {
  private http = inject(HttpClient);

  searchQuery = signal<string>('');
  searchResults = signal<UserSearchResult[]>([]);
  isSearching = signal<boolean>(false);
  hasSearched = signal<boolean>(false);

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onSearch() {
    const query = this.searchQuery().trim();
    if (!query) {
      this.searchResults.set([]);
      this.hasSearched.set(false);
      return;
    }

    this.isSearching.set(true);
    this.hasSearched.set(true);

    this.http.get<UserSearchResult[]>(`${environment.apiUrl}/users/search?q=${query}`).subscribe({
      next: (results) => {
        this.searchResults.set(results);
        this.isSearching.set(false);
      },
      error: (err) => {
        console.error('Error searching users:', err);
        this.isSearching.set(false);
      },
    });
  }
}
