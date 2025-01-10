import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  animations: [
    trigger('panelState', [
      state('closed', style({ height: '30px' })),
      state('open', style({ height: 'calc(100% - 20px)' })),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ]),
  ]
})
export class PresentationComponent {
  textFolded: string = '';
  screenWidth: number = 1000;

  imageBlob: string = ''

  constructor(private imgs: ImagesService) {
    this.imgs.getImage('home')
      .subscribe(image => this.imageBlob = image)
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 500) {
      this.textFolded = 'closed'
    } else {
      this.textFolded = 'open'
    }
  }

  toggleFold($event: any) {
    if ($event && this.textFolded === 'open')
      document.getElementById('text-container')?.scrollTo({ top: 0 })
    if (this.screenWidth <= 500)
      this.textFolded = this.textFolded === 'open' ? 'closed' : 'open'
  }

  @HostListener('touchmove', ['$event'])
  onScroll(event: TouchEvent) {
    let target = (event.target as unknown) as HTMLElement
    let parentNode = (target.parentNode as unknown) as HTMLElement
    if (event.touches.length === 1 && !(target?.id == 'text-container' || parentNode?.id == 'text-container') && this.textFolded === 'closed')
      this.textFolded = 'open'
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.screenWidth = width
    this.toggleFold(null)
  }
}
