import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { ImagesService } from '../../services/images.service';
import { NotificationService } from 'src/app/services/notification.service';
import { svglCsharp } from '@ng-icons/svgl'

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PresentationComponent implements OnInit {
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

  protected currentlyWorkingOnChart: {
    data: {
      datasets: Array<{ data: number[] }>,
      labels: string[]
    },
    options: {}
  }

  protected angularIcon: string = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
            <g clip-path="url(#prefix__clip0_9_19)">
              <mask id="prefix__a" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="14" y="0" width="484"
                height="512">
                <path d="M14 0h484v512H14V0z" fill="#fff" />
              </mask>
              <g mask="url(#prefix__a)">
                <mask id="prefix__b" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="14" y="0" width="484"
                  height="512">
                  <path d="M14 0h484v512H14V0z" fill="#fff" />
                </mask>
                <g mask="url(#prefix__b)">
                  <path
                    d="M496 86l-18 272L312 0l184 86zM380 438l-124 72-126-72 24-62h202l24 62zM256 136l64 160H190l66-160zM32 358L14 86 198 0 32 358z"
                    fill="url(#prefix__paint0_linear_9_19)" />
                  <path
                    d="M496 86l-18 272L312 0l184 86zM380 438l-124 72-126-72 24-62h202l24 62zM256 136l64 160H190l66-160zM32 358L14 86 198 0 32 358z"
                    fill="url(#prefix__paint1_linear_9_19)" />
                </g>
              </g>
            </g>
            <defs>
              <linearGradient id="prefix__paint0_linear_9_19" x1="120.4" y1="463.8" x2="504" y2="281.4"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#E40035" />
                <stop offset=".2" stop-color="#F60A48" />
                <stop offset=".4" stop-color="#F20755" />
                <stop offset=".5" stop-color="#DC087D" />
                <stop offset=".7" stop-color="#9717E7" />
                <stop offset="1" stop-color="#6C00F5" />
              </linearGradient>
              <linearGradient id="prefix__paint1_linear_9_19" x1="103" y1="61.4" x2="354" y2="348"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#FF31D9" />
                <stop offset="1" stop-color="#FF5BE1" stop-opacity="0" />
              </linearGradient>
              <clipPath id="prefix__clip0_9_19">
                <path fill="#fff" transform="translate(14)" d="M0 0h484v512H0z" />
              </clipPath>
            </defs>
          </svg>`

  protected siemensIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 64 64">
            <path d="M0 0h64v64H0z" fill="#099" />
            <path
              d="M19.01 49.22v-7.04c4.013 1.262 7.563 1.892 10.65 1.892 4.258-.005 6.388-1.134 6.388-3.39a2.76 2.76 0 0 0-.933-2.118c-.63-.603-2.256-1.448-4.874-2.535-4.698-1.922-7.76-3.564-9.185-4.926-1.847-1.797-2.77-4.065-2.77-6.804 0-3.53 1.345-6.224 4.034-8.082s6.153-2.77 10.39-2.733c2.352 0 5.757.434 10.213 1.3v6.78c-3.313-1.323-6.388-1.985-9.223-1.985-4.003 0-6.005 1.1-6.005 3.303.01.84.47 1.612 1.21 2.015.663.42 2.508 1.31 5.537 2.67 4.354 1.933 7.253 3.614 8.697 5.042 1.715 1.697 2.572 3.89 2.572 6.582 0 3.87-1.68 6.82-5.042 8.847-2.733 1.65-6.262 2.472-10.59 2.47-3.727-.007-7.44-.442-11.067-1.298z"
              fill="#fff" />
          </svg>`

  constructor(
    private imgs: ImagesService,
    private notification: NotificationService,
    private clipboard: Clipboard,
    private sanitizer: DomSanitizer) {
    this.hoursWidth = ''
    this.hoursProgramming = ''
    this.spanNumbersArray = []
    this.linesOfCode = {
      html: '',
      width: ''
    }

    this.currentlyWorkingOnChart = {
      data: { datasets: [{ data: [55, 85, 70, 75, 85] }], labels: ['SimaticIT', 'AngularJS', 'Angular', '.Net/.Net Framework', 'Opcenter'] },
      options: {
        borderWidth: 1,
        layout: {
          padding: {
            autoPadding: false,
          }
        },
        maintainAspectRatio: false,
        onResize: (...args: any) => {
          console.log('Chart resized', args)
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false,
            external: (context: any) => {
              const { chart, tooltip } = context
              const tooltipElement = ((chart: any) => {
                let tooltipEl = chart.canvas.parentNode.querySelector('div');
                if (!tooltipEl) {
                  tooltipEl = document.createElement('div');
                  tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
                  tooltipEl.style.borderRadius = '3px';
                  tooltipEl.style.color = 'white';
                  tooltipEl.style.opacity = 1;
                  tooltipEl.style.pointerEvents = 'none';
                  tooltipEl.style.position = 'absolute';
                  tooltipEl.style.transform = 'translate(-50%, 0)';
                  tooltipEl.style.transition = 'all .1s ease';

                  const table = document.createElement('table');
                  table.style.margin = '0px';

                  tooltipEl.appendChild(table);
                  chart.canvas.parentNode.appendChild(tooltipEl);
                }

                return tooltipEl;
              })(chart)

              if (tooltip.opacity === 0) {
                tooltipElement.style.opacity = 0;
                return;
              }

              // Set Text
              if (tooltip.body) {
                const titleLines = tooltip.title || [];
                const bodyLines = tooltip.body.map((b: any) => b.lines);

                const tableHead = document.createElement('thead');

                titleLines.forEach((title: any) => {
                  const tr = document.createElement('tr');
                  tr.style.borderWidth = '0'

                  const th = document.createElement('th');
                  th.style.borderWidth = '0'
                  th.style.fontWeight = '250'
                  const text = document.createTextNode(title);

                  th.appendChild(text);
                  tr.appendChild(th);
                  tableHead.appendChild(tr);
                });

                const tableBody = document.createElement('tbody');
                bodyLines.forEach((body: any, i: number) => {
                  const title = titleLines[i]
                  const colors = tooltip.labelColors[i];

                  const span = document.createElement('span');
                  span.style.background = colors.backgroundColor;
                  span.style.borderColor = colors.borderColor;
                  span.style.borderWidth = '2px';
                  span.style.marginRight = '10px';
                  span.style.height = '10px';
                  span.style.width = '10px';
                  span.style.display = 'inline-block';

                  const tr = document.createElement('tr');
                  tr.style.backgroundColor = 'inherit';
                  tr.style.borderWidth = '0'

                  const td = document.createElement('td');
                  td.style.borderWidth = '0'
                  td.innerHTML = `<div style="height: 70px">${(() => {
                    switch (title) {
                      case 'Angular':
                      case 'AngularJS': return this.angularIcon
                      case '.Net/.Net Framework':
                        let svgParts = svglCsharp.split('svg ')
                        return `${svgParts[0]}svg height="100%" width="100%" ${svgParts[1]}`
                      case 'Opcenter':
                      case 'SimaticIT': return this.siemensIcon
                      default: return ''
                    }
                  })()}</div>`

                  if (title === '.Net/.Net Framework') {
                    let element: any = document.createElement('ng-icon')
                    element.name = 'simpleSiemens'
                    td.append(element)
                  }

                  // td.appendChild(span);

                  // td.append(`<ng-icon name="simpleSiemens"></ng-icon>`)
                  tr.appendChild(td);
                  tableBody.appendChild(tr);
                });

                const tableRoot = tooltipElement.querySelector('table');

                // Remove old children
                while (tableRoot.firstChild) {
                  tableRoot.firstChild.remove();
                }

                // Add new children
                tableRoot.appendChild(tableHead);
                tableRoot.appendChild(tableBody);
              }
              const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

              // Display, position, and set styles for font
              tooltipElement.style.opacity = 1;
              tooltipElement.style.left = positionX + tooltip.caretX + 'px';
              tooltipElement.style.top = positionY + tooltip.caretY + 'px';
              tooltipElement.style.font = tooltip.options.bodyFont.string;
              tooltipElement.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
            }
          }
        },
        scales: {
          r: {
            pointLabels: {
              backdropPadding: 1,
              display: true,
              callback: (value: string) => value.length > 15 ? `${value.substring(0, 12)}...` : value,
              centerPointLabels: true,
              font: {
                size: 15
              },
              padding: 3
            },
            ticks: {
              display: false
            }
          }
        }
      }
    }

    this.imgs.getImage('home')
      .subscribe(image => this.imageBlob = image)
  }

  ngOnInit() {
    this.setUpNumbers()
    this.setUpLinesOfCode()
  }

  public copyEmail() {
    if (this.clipboard.copy('carlosig490@gmail.com'))
      this.notification.success('Copiado al portapapeles', 3000)
  }

  private setUpNumbers(): void {
    let hoursDigits = (() => { return Math.floor(new Date().getFullYear() - new Date('01-01-2022 00:00:00Z').getFullYear()) })()
      .toString().split('')

    for (let i = 0; i < hoursDigits.length; i++) {
      const spanList = Array(10).fill(0, 0, 10)

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
    this.linesOfCode.html = this.sanitizer.bypassSecurityTrustHtml(spanNumbersArray.join(''))
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

  @HostListener('copy', ['$event']) blockCopy(e: ClipboardEvent) {
    e.stopPropagation()
    e.preventDefault();
  }
}