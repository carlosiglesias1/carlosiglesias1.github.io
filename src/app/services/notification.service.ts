import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification$: Subject<INotification | null> = new BehaviorSubject<INotification | null>(null);

  constructor() { }

  get notification() {
    return this.notification$.asObservable();
  }

  success(message: string, duration: number | null = null) {
    this.notify(message, NotificationType.Success, duration);
  }
  warning(message: string, duration: number | null = null) {
    this.notify(message, NotificationType.Warning, duration);
  }
  error(message: string, duration: number | null = null) {
    this.notify(message, NotificationType.Error, duration);
  }

  private notify(message: string, type: NotificationType, duration: number | null) {
    this.notification$.next({
      message: message,
      type: type,
      duration: duration || 10000
    } as INotification)
  }
}

export interface INotification {
  message: string,
  type: NotificationType,
  duration: number
}

export enum NotificationType {
  Success = 0,
  Warning = 1,
  Error = 2
}