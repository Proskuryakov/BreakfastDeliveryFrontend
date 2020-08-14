import { APP_INITIALIZER, Inject, Injectable, Provider } from '@angular/core';
import { Anonymous, CurrentUser, LoggedUser } from './current-user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environmentUsers } from '../../../environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { Role } from './role.model';
import { CookieService } from 'ngx-cookie-service';

interface ApiProfile {
  id: number;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export class AnonymousUserImpl implements Anonymous {
  readonly authenticated: false = false;

  hasRole(role: Role): boolean {
    return false;
  }
}

export class CurrentUserImpl implements LoggedUser {
  readonly authenticated: true = true;
  readonly username = this.profile.username;

  private role: string = this.profile.role;

  constructor(readonly profile: ApiProfile) {}

  hasRole(role: Role): boolean {
    return this.role === role;
  }
}

// const a = new Subject();
// a.next(1);
// a.subscribe();

// new BehaviorSubject(undefined).getValue()

// new ReplaySubject(1).subscribe()

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  readonly user$ = new BehaviorSubject<CurrentUser>(new AnonymousUserImpl());

  constructor(private http: HttpClient) {}

  getCurrentUser(profile: ApiProfile): void {
    localStorage.setItem('id', String(profile.id));
    localStorage.setItem('username', profile.username);
    localStorage.setItem('role', profile.role);
    localStorage.setItem('firstName', profile.firstName);
    localStorage.setItem('lastName', profile.lastName);
    localStorage.setItem('email', profile.email);
    localStorage.setItem('phone', profile.phone);
  }

  login(usernameValue: string, passwordValue: string): Observable<ApiProfile> {
    return this.http.post<ApiProfile>(`${environmentUsers.api}/auth/login`, {
      username: usernameValue,
      password: passwordValue
    });
  }

  logout(): Observable<Response> {
    return this.http.post<Response>(`${environmentUsers.api}/logout`, undefined);
  }

  refreshCurrentUser(): Observable<void> {
    return this.http.get<ApiProfile | undefined>(`${environmentUsers.api}/user`).pipe(
      tap((profile) => {
        if (profile == undefined) {
          this.user$.next(new AnonymousUserImpl());
        } else {
          this.user$.next(new CurrentUserImpl(profile));
        }
      })
    ) as Observable<void>;
  }
}

export function currentUserInitializerFactory(currentUserService: CurrentUserService): () => Promise<void> {
  return () => {
    return currentUserService.refreshCurrentUser().toPromise();
  };
}

export const CURRENT_USER_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: currentUserInitializerFactory,
  deps: [CurrentUserService],
  multi: true
};
