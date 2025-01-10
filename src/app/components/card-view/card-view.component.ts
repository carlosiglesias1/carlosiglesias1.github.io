import { Component, Input } from '@angular/core';

@Component({
  selector: 'cig-card-view',
  standalone: true,
  imports: [],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css'
})
export class CardViewComponent {
  private _image: string

  @Input()
  public title: string

  constructor() {
    this._image = ''
    this.title = ''
  }

  get image(): string {
    return this._image
  }

  @Input('image')
  set image(val: string) {
    if (val)
      this._image = val
  }
}
