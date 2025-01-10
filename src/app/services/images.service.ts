import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private imageUrls: Map<string, string>
  private images: Map<string, string> = new Map();
  private imageRequests: Map<string, Observable<string>> = new Map();

  constructor() {
    let driveUrl = 'https://lh3.googleusercontent.com/d/'
    this.imageUrls = new Map(
      [
        [
          'home', driveUrl + '1CqLB45J7fpKnHPx8SAV5-X_BVhmHfGOl'
        ],
        [
          'lms', driveUrl + '1LxnQoOLscEtIb3MTb4oc6tMf9ozOh-zy'
        ],
        [
          'mes', driveUrl + '1ofkBJxPOUtjKQFRwbIN_YGDFs2rceWiV'
        ]
      ]
    );

    this.getImages()
    for (let request of this.imageRequests) {
      request[1].subscribe(response => {
        this.images.set(request[0], response)
      })
    }
  }

  public getImage(name: string): Observable<string> {
    return new Observable<string>((subscriber: Subscriber<any>) => {
      if (!this.images.has(name)) {
        if (this.imageRequests.has(name)) {
          this.imageRequests.get(name)
            ?.subscribe((response) => {
              let srcImg = response
              this.images.set(name, srcImg)
              subscriber.next(srcImg)
            })
        }
      }
      subscriber.next(this.images.get(name));
    })
  }

  private getImages() {
    // let headers = new HttpHeaders()
    // headers = headers
    //   .set('Accept', ' image/*, application/json, text/plain')
    for (let image of this.imageUrls) {
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
            } else {
              observer.error(xhr);
            }
          }
        };
        xhr.open('get', image[1], true)
        xhr.responseType = 'arraybuffer'
        xhr.setRequestHeader('Accept', ' image/*, application/json, text/plain')
        xhr.send()
      })

      this.imageRequests.set(image[0], request)
    }
  }
}
