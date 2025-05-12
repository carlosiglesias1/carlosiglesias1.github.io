import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PresentationComponent {
  screenWidth: number = 1000;
  socialMediaSize: string = '32px'
  hoursWidth: string
  textFolded: string = '';
  imageBlob: string = ''
  hoursProgramming: SafeHtml
  spanNumbersArray: Array<string>
  linesOfCode: {
    html: SafeHtml,
    width: string
  }

  constructor(private imgs: ImagesService, private clipboard: Clipboard, private sanitizer: DomSanitizer) {
    this.hoursWidth = ''
    this.hoursProgramming = ''
    this.spanNumbersArray = []
    this.linesOfCode = {
      html: '',
      width: ''
    }

    this.imgs.getImage('home')
      .subscribe(image => this.imageBlob = image)
  }

  ngOnInit() {
    this.setUpNumbers()
    this.setUpLinesOfCode()
  }

  public copyEmail() {
    if(this.clipboard.copy('carlosig490@gmail.com'))
      alert('Copiado al portapapeles')
    // this.clipboard.writeText('carlosig490@gmail.com')
    //   .then(() => alert("Copiado al portapapeles"))
  }

  private setUpNumbers(): void {
    let hoursDigits = (() => { return Math.floor((new Date().getTime() - new Date('01-01-2020 00:00:00Z').getTime()) / 3600000) })()
      .toString().split('')

    for (let i = 0; i < hoursDigits.length; i++) {
      const spanList = Array(10)
        .fill(0, 0, 10)

      this.spanNumbersArray.push(`<span class="number-holder visible">${spanList.map((_, index) => `<span>${index}</span>`).join('')}</span>`)
    }
    this.hoursProgramming = this.sanitizer.bypassSecurityTrustHtml(this.spanNumbersArray.join(''))

    setTimeout(() => {
      this.animateNumber('#hours-counter>span', hoursDigits)
      this.hoursWidth = `${hoursDigits.length * 28}px`
    }, 200)
  }

  private setUpLinesOfCode(): void {
    const linesOfCode = (26145).toString().split('')
    let spanNumbersArray = []

    for (let i = 0; i < linesOfCode.length; i++) {
      const spanList = Array(10)
        .fill(0, 0, 10)

      spanNumbersArray.push(`<span class="number-holder visible">${spanList.map((_, index) => `<span>${index}</span>`).join('')}</span>`)
    }
    this.linesOfCode.html = this.sanitizer.bypassSecurityTrustHtml('~' + spanNumbersArray.join(''))
    setTimeout(() => {
      this.animateNumber('#lines-wroten>span', linesOfCode)
      this.linesOfCode.width = `${(linesOfCode.length + 1) * 28}px`
    }, 200)
  }

  private animateNumber(selector: string, hoursDigits: string[]): void {
    for (let i = 0; i < hoursDigits.length; i++) {
      document.querySelectorAll(selector)
        .forEach((span, index) => {
          const htmlSpan = span as HTMLElement
          htmlSpan.style.transform = `translateY(-${100 * parseInt(hoursDigits[index])}%)`
        })
    }
  }
}