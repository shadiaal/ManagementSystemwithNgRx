import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { taskReducer } from './store/task.reducer'; 
import { RouterModule } from '@angular/router';
import { provideHttpClient,withFetch  } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/task.effects';
import { provideEffects } from '@ngrx/effects';


export const appConfig: ApplicationConfig = {
  providers: [ 
    provideHttpClient (withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideClientHydration(withEventReplay()),
       provideStore({ tasks: taskReducer }), 
       { provide: EffectsModule, useFactory: () => EffectsModule.forRoot([TaskEffects]) }
     
      ]
};
