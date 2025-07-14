import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";


// @ts-ignore
export const appConfig: ApplicationConfig = {
  // providers: [
  //   provideRouter(routes),
  //
  //   importProvidersFrom(HttpClientModule,BrowserAnimationsModule,ToastrModule.forRoot({
  //     timeOut: 3000,
  //     positionClass: 'toast-bottom-right',
  //     preventDuplicates: true,
  //   }), ReactiveFormsModule),
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi: true
  //   }
  // ]
    providers: [
      provideRouter(routes),

      // ESTE es el cambio clave: usar provideHttpClient
      provideHttpClient(
        withInterceptors([ AuthInterceptor ])
      ),

      provideAnimations(),
      importProvidersFrom(
        ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ),
    ]
};
