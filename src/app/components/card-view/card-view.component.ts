import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: 'cig-card-view',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
})
export class CardViewComponent {
  protected _content?: string
  private _icon?: string
  private _image: string

  @Input()
  public title: string

  state = 'collapsed'

  constructor() {
    this._image = ''
    this._icon = ''
    this.title = ''
    this._content = ''
  }

  get image(): string {
    return this._image
  }

  get content(): string | undefined {
    return this._content;
  }

  get icon():string | undefined {
    return this._icon;
  }

  @Input('image')
  set image(val: string) {
    if (val)
      this._image = val
  }

  @Input('content')
  set content(val: string) {
    this._content = val
  }

  @Input('icon')
  set icon(val: string | undefined) {
    this._icon = val
  }

  public expandCard($event: MouseEvent): void {
    $event.preventDefault()
  }
}
