import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../core/token-storage.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenStorage = inject(TokenStorageService);
  private api = environment.apiUrl + 'auth';

  login(credentials: { email: string, password: string }) {
    return this.http.post<{ access_token: string, refresh_token: string }>(`${this.api}/login`, credentials)
      .pipe(
        tap(({ access_token, refresh_token }) => {
          this.tokenStorage.setAccessToken(access_token);
          this.tokenStorage.setRefreshToken(refresh_token);
        })
      );
  }

  logout() {
    this.tokenStorage.clear();
  }
}
