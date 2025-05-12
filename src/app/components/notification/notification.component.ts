import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs';
import { INotification, NotificationService, NotificationType } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @ViewChild('notificationContainer') container: ElementRef<HTMLDivElement> | undefined;
  private classMap: Map<NotificationType, string>;
  private _subscribed: boolean = true;

  constructor(
    private service: NotificationService,
    private renderer: Renderer2) {
    this.classMap = new Map<NotificationType, string>();
  }

  ngOnInit(): void {
    this.classMap.set(NotificationType.Success, 'success');
    this.classMap.set(NotificationType.Warning, 'warning');
    this.classMap.set(NotificationType.Error, 'error');

    this.service.notification
      .pipe(takeWhile(() => this._subscribed))
      .subscribe(notification => {
        if (notification) this.render(notification);
      });
  }
  ngOnDestroy() {
    this._subscribed = false;
  }
  private render(notification: INotification) {
    const boxColorClass = this.classMap.get(notification.type);
    let classesToAdd = ['message-box', boxColorClass];

    let notificationBox = this.renderer.createElement('div');
    let header = this.renderer.createElement('b');
    let content = this.renderer.createElement('div');
    classesToAdd.forEach((_class) => _class && this.renderer.addClass(notificationBox, _class));
    this.renderer.setStyle(notificationBox, 'transition', `opacity ${notification.duration}ms`);
    this.renderer.setStyle(notificationBox, 'opacity', '1');
    const headerText = this.renderer.createText(NotificationType[notification.type]);
    this.renderer.appendChild(header, headerText);
    const text = this.renderer.createText(notification.message);
    this.renderer.appendChild(content, text);
    if (this.container)
      this.renderer.appendChild(this.container.nativeElement, notificationBox);
    this.renderer.appendChild(notificationBox, header);
    this.renderer.appendChild(notificationBox, content);

    setTimeout(() => {
      this.renderer.setStyle(notificationBox, 'opacity', '0');
      setTimeout(() => {
        if (this.container)
          this.renderer.removeChild(this.container.nativeElement, notificationBox);
      }, notification.duration);
    }, notification.duration);
  }
}
