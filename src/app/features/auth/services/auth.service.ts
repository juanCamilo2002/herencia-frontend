import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { environment } from '../../../../environments/environment';
import { AuthResponse, LoginDto } from '../models/auth.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenStorage = inject(TokenStorageService);
  private api = environment.apiUrl + 'auth';

  login(credentials: LoginDto) {
    return this.http.post<AuthResponse>(`${this.api}/login`, credentials)
    .pipe(
      tap(({ access_token, refresh_token}) => {
        this.tokenStorage.setAccessToken(access_token);
        this.tokenStorage.setRefreshToken(refresh_token);
      })
    );
  }

  logout() {
    this.tokenStorage.clear();
  }
}
