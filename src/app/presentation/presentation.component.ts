import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  animations: [
    trigger('panelState', [
      state('closed', style({ height: '200px' })),
      state('open', style({ height: 'calc(100% - 20px)'})),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ]),
  ]
})
export class PresentationComponent {
  textFolded: string = '';
  screenWidth: number = 1000;

  constructor() {
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 500){
      this.textFolded = 'closed'
    }else{
      this.textFolded = 'open'
    }
  }

  toggleFold() {
    if (this.screenWidth <= 500)
      this.textFolded = this.textFolded === 'open' ? 'closed' : 'open'
  }
}
