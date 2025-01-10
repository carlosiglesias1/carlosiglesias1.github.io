import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgIconsModule } from '@ng-icons/core';
import { bootstrapGithub, bootstrapInstagram, bootstrapLinkedin, bootstrapArrowUp, bootstrapArrowDown } from '@ng-icons/bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PresentationComponent } from './sections/presentation/presentation.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { CardViewComponent } from './components/card-view/card-view.component';

import { ImagesService } from './services/images.service';

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    ProjectsComponent,
    SkillsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({ bootstrapGithub, bootstrapInstagram, bootstrapLinkedin, bootstrapArrowUp, bootstrapArrowDown }),
    ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    CardViewComponent
],
  providers: [ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }