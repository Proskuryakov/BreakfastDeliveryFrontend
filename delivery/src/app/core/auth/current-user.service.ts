import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { Anonymous, CurrentUser, LoggedUser } from './current-user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environmentUsers } from '../../../environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { Role } from './role.model';
import { DataService } from '../../data.service';
import { AnalyzeEntryPointsFn } from '@angular/compiler-cli/ngcc/src/execution/api';
import { CookieService } from 'ngx-cookie-service';

interface ApiProfile {
  id: number;
  username: string;
  userRole: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
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

  private role: string = this.profile.userRole;

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

  constructor(
    private readonly dataService: DataService,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    console.log('Current User created');
  }

  refreshCurrentUser(profile: ApiProfile): void {
    this.cookieService.set('id', String(profile.id));
    this.cookieService.set('username', profile.username);
    this.cookieService.set('userRole', profile.userRole);
    this.cookieService.set('firstname', profile.personalInfo.firstName);
    this.cookieService.set('lastName', profile.personalInfo.lastName);
    this.cookieService.set('email', profile.personalInfo.email);
    this.cookieService.set('phone', profile.personalInfo.phone);
  }

  login(usernameValue: string, passwordValue: string): Observable<ApiProfile> {
    return this.http.post<ApiProfile>(`${environmentUsers.api}/auth/login`, {
      username: usernameValue,
      password: passwordValue
    });
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${environmentUsers.api}/auth/logout`, undefined)
      .pipe(tap(() => this.user$.next(new AnonymousUserImpl())));
  }
}

/*export function currentUserInitializerFactory(currentUserService: CurrentUserService): () => Promise<void> {
  return () => {
    return currentUserService.refreshCurrentUser().toPromise();
  };
}*/

/*export const CURRENT_USER_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: currentUserInitializerFactory,
  deps: [CurrentUserService],
  multi: true
};*/
