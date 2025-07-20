import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgIconsModule } from '@ng-icons/core';
import { bootstrapFileCode, bootstrapFileCodeFill, bootstrapGithub, bootstrapHouse, bootstrapHouseFill, bootstrapInstagram, bootstrapLinkedin, bootstrapArrowUp, bootstrapArrowDown } from '@ng-icons/bootstrap-icons';
import { remixAngularjsLine } from '@ng-icons/remixicon';
import { simpleSiemens } from '@ng-icons/simple-icons';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PresentationComponent } from './sections/presentation/presentation.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { NotificationComponent } from './components/notification/notification.component';

import { ImagesService } from './services/images.service';

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    ProjectsComponent,
    SkillsComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({ bootstrapFileCode, bootstrapFileCodeFill, bootstrapGithub, bootstrapHouse, bootstrapHouseFill, bootstrapInstagram, bootstrapLinkedin, bootstrapArrowUp, bootstrapArrowDown, remixAngularjsLine, simpleSiemens }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CardViewComponent,
    BaseChartDirective
  ],
  providers: [provideCharts(withDefaultRegisterables()), ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }