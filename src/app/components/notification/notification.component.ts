import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs';
import { INotification, NotificationService, NotificationType } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
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
    let content = this.renderer.createElement('h4');
    let progressBarContainer = this.renderer.createElement('div')
    let progressBar = this.renderer.createElement('div');

    classesToAdd.forEach((_class) => _class && this.renderer.addClass(notificationBox, _class));
    this.renderer.addClass(progressBarContainer, 'progress-bar-container')
    this.renderer.setStyle(notificationBox, 'transition', `opacity ${1000}ms`); //notification.duration
    this.renderer.setStyle(notificationBox, 'opacity', '1');

    this.renderer.setStyle(progressBar, 'height', '100%');
    this.renderer.setStyle(progressBar, 'width', '0');
    this.renderer.setStyle(progressBar, 'background-color', '#137417')
    // this.renderer.setStyle(progressBar, 'margin-right', '30px')
    // this.renderer.setStyle(progressBar, 'position', 'absolute')
    this.renderer.setStyle(progressBar, 'bottom', 10)

    const text = this.renderer.createText(notification.message);
    this.renderer.appendChild(content, text);

    if (this.container)
      this.renderer.appendChild(this.container.nativeElement, notificationBox);

    this.renderer.appendChild(progressBarContainer, progressBar);    
    this.renderer.appendChild(notificationBox, content);
    this.renderer.appendChild(notificationBox, progressBarContainer)

    setTimeout(() => {
      this.renderer.setStyle(notificationBox, 'opacity', '0');
      setTimeout(() => {
        if (this.container)
          this.renderer.removeChild(this.container.nativeElement, notificationBox);
      }, notification.duration);
    }, notification.duration);

    let timePassed = 0
    let intervalId = setInterval(() => {
      if (timePassed >= notification.duration)
        clearInterval(intervalId)
      else {
        let width = (timePassed / notification.duration) * 100
        this.renderer.setStyle(progressBar, 'width', `${width}%`)

        timePassed += 10
      }
    }, 10)
  }
}