import {
  CanActivateFn,
  Router,
  UrlTree
} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../core/services/auth.service";

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/auth/login']);
};
