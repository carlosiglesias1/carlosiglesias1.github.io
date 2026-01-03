import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: 'cig-card-view',
  standalone: true,
  imports: [NgIcon, NgFor],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
})
export class CardViewComponent {
  protected _description?: string
  private _icon?: string
  private _image: string
  private _tecnologies: string[]

  @Input()
  public title: string

  state = 'collapsed'

  constructor() {
    this._image = ''
    this._icon = ''
    this.title = ''
    this._description = ''
    this._tecnologies = []
  }

  get image(): string {
    return this._image
  }

  get icon(): string | undefined {
    return this._icon;
  }

  get description(): string | undefined {
    return this._description;
  }

  get tecnologies(): string[]{
    return this._tecnologies
  }

  @Input('image')
  set image(val: string) {
    if (val)
      this._image = val
  }

  @Input('icon')
  set icon(val: string | undefined) {
    this._icon = val
  }

  @Input('description')
  set description(val: string) {
    this._description = val
  }

  @Input('tecnologies')
  set tecnologies(val: string[]) {
    this._tecnologies = val
  }

  public expandCard($event: MouseEvent): void {
    $event.preventDefault()
  }
}
