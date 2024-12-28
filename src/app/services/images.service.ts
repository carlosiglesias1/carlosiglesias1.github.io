import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private images: Map<string, string> = new Map();
  private imageRequests: Map<string, Observable<string>> = new Map();

  constructor(private http: HttpClient) {
    this.getImages()
  }

  public getImage(name: string): Observable<string> {
    return new Observable<string>((subscriber: Subscriber<any>) => {
      if (!this.images.has(name)) {
        if (this.imageRequests.has(name)) {
          this.imageRequests.get('home')
            ?.subscribe((response) => {
              let srcImg = `data:image/bmp;base64,${response}`
              this.images.set('home', srcImg) 
              subscriber.next(srcImg)
            })
        }
      }
      subscriber.next(this.images.get(name));
    })
  }

  private getImages() {
    let headers = new HttpHeaders()
    headers = headers
      // .append('Access-Control-Allow-Origin', '*')
      .set('Accept', ' image/*, application/json, text/plain')

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

            observer.next(btoa(data));
          } else {
            observer.error(xhr);
          }
        }
      };
      xhr.open('get', 'https://lh3.googleusercontent.com/d/1CqLB45J7fpKnHPx8SAV5-X_BVhmHfGOl', true)
      xhr.responseType = 'arraybuffer'
      xhr.setRequestHeader('Accept', ' image/*, application/json, text/plain')
      xhr.send()
    })

    this.imageRequests.set('home', request)
  }
}
