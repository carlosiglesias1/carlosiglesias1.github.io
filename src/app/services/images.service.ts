import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private imageUrls: Map<string, string>
  private images: Map<string, string> = new Map();
  private imageRequests: Map<string, Subscription> = new Map();

  constructor() {
    let driveContentUrl = 'https://lh3.googleusercontent.com/d/'

    this.imageUrls = new Map(
      [
        [
          'home', `${driveContentUrl}1csj7K5ey5nMEYgnGxgefk2Bi1xr9NF6H`
        ],
        [
          'lms', driveContentUrl + '10CDh8WWnh6i_zdpjK_cNHhgiMXgEhOT3'
        ],
        [
          'mes', driveContentUrl + '1ofkBJxPOUtjKQFRwbIN_YGDFs2rceWiV'
        ],
        [
          'erp', driveContentUrl + '1GDoQJujVYYgHMTC4tMCswpnv6hVrsYPO'
        ],
        [
          'oracle', driveContentUrl + '1OcQwubcFt32y_MTZ2ja1N0XopGy2AQgK'
        ]
      ]
    );

    this.loadImageRequests()
  }

  public getImage(name: string): Observable<string> {
    return new Observable<string>((subscriber: Subscriber<any>) => {
      if (this.images.has(name))
        subscriber.next(this.images.get(name))
      else {
        if (this.imageRequests.has(name)) {
          let subscription = this.imageRequests.get(name)
          if (subscription?.closed) {
            subscriber.next(this.images.get(name))
          } else {
            this.imageRequests.get(name)
              ?.add(() => {
                subscriber.next(this.images.get(name))
              })
          }
        }
      }
    })
  }

  private loadImageRequests() {
    for (let [image, url] of this.imageUrls) {
      let request = new Observable((observer: Subscriber<any>) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              var uInt8Array = new Uint8Array(xhr.response);
              var i = uInt8Array.length;
              var binaryString = new Array(i);
              while (i--) {
                binaryString[i] = String.fromCharCode(uInt8Array[i]);
              }
              var data = binaryString.join('');

              observer.next(`data:image/bmp;base64,${btoa(data)}`);
              observer.complete()
              observer.unsubscribe()
            } else {
              observer.error(xhr);
            }
          }
        };
        xhr.open('get', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.setRequestHeader('Accept', ' image/*, application/json, text/plain')
        xhr.send()
      })

      const observer = {
        next: (response: string) => {
          this.images.set(image, response)
        },
        error: (error: any) => {
          console.log(error)
        },
        complete: () => {
          console.log('request completed')
        }
      }
      let subscription = request.subscribe(observer)

      this.imageRequests.set(image, subscription)
    }
  }
}
