import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { Anonymous, CurrentUser, LoggedUser } from './current-user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environmentUsers } from '../../../environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { Role } from './role.model';

interface ApiProfile {
  username: string;
  roles: [Role];
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

  private roles: Set<Role> = new Set(this.profile.roles);

  constructor(readonly profile: ApiProfile) {}

  hasRole(role: Role): boolean {
    return this.roles.has(role);
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

  constructor(private http: HttpClient) {
    console.log('Current User created');
  }

  refreshCurrentUser(): Observable<void> {
    return this.http.get<ApiProfile | undefined>(`${environmentUsers.api}/api/public/profile`).pipe(
      tap((profile) => {
        if (profile == undefined) {
          this.user$.next(new AnonymousUserImpl());
        } else {
          this.user$.next(new CurrentUserImpl(profile));
        }
      })
    ) as Observable<void>;
  }

  login(username: string, password: string): Observable<void> {
    const form = new HttpParams({
      fromObject: {
        username,
        password
      }
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/form-data'
    });

    return this.http.post<void>(`http://127.0.0.1:8080/api/auth/login`, form.toString());
    // .pipe(switchMap(() => this.refreshCurrentUser()));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${environmentUsers.api}/auth/logout`, undefined)
      .pipe(tap(() => this.user$.next(new AnonymousUserImpl())));
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
