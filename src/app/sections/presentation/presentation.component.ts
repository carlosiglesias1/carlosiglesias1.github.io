import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { ImagesService } from '../../services/images.service';
import { NotificationService } from 'src/app/services/notification.service';
import { svglCsharp, svglSqlServer } from '@ng-icons/svgl'
import { bootstrapGit } from '@ng-icons/bootstrap-icons';

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
      datasets: Array<{ backgroundColor: string[], data: number[] }>,
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

  protected dotnetIcon: string = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" fill-rule="evenodd" clip-rule="evenodd"
          stroke-linejoin="round" stroke-miterlimit="2">
          <path fill="#512bd4" d="M-.134-.326h512.002v512.002H-.134z" />
          <path
            d="M91.122 326.786c-3.62 0-6.698-1.206-9.232-3.619-2.534-2.475-3.8-5.413-3.8-8.815 0-3.465 1.266-6.434 3.8-8.908 2.534-2.475 5.612-3.712 9.232-3.712 3.68 0 6.787 1.237 9.321 3.712 2.595 2.474 3.892 5.443 3.892 8.908 0 3.402-1.297 6.34-3.892 8.815-2.534 2.413-5.64 3.619-9.321 3.619zM235.844 324.745h-23.532l-61.996-97.807a43.764 43.764 0 01-3.892-7.703h-.543c.483 2.847.724 8.94.724 18.28v87.23h-20.817v-133.07h25.07l59.916 95.487c2.534 3.96 4.163 6.682 4.887 8.166h.362c-.603-3.525-.905-9.495-.905-17.91v-85.743h20.726v133.07zM337.213 324.745h-72.856v-133.07h69.96v18.745h-48.42v37.675h44.62v18.652h-44.62v39.346h51.316v18.652zM440.757 210.42h-37.289v114.325h-21.54V210.42H344.73v-18.745h96.027v18.745z"
            fill="#fff" fill-rule="nonzero" />
        </svg>`

  protected devOpsIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 18">
        <defs>
          <linearGradient id="ba420277-700e-42cc-9de9-5388a5c16e54" x1="9" y1="16.97" x2="9" y2="1.03"
            gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#0078d4" />
            <stop offset="0.16" stop-color="#1380da" />
            <stop offset="0.53" stop-color="#3c91e5" />
            <stop offset="0.82" stop-color="#559cec" />
            <stop offset="1" stop-color="#5ea0ef" />
          </linearGradient>
        </defs>
        <title>Icon-devops-261</title>
        <path id="a91f0ca4-8fb7-4019-9c09-0a52e2c05754"
          d="M17,4v9.74l-4,3.28-6.2-2.26V17L3.29,12.41l10.23.8V4.44Zm-3.41.49L7.85,1V3.29L2.58,4.84,1,6.87v4.61l2.26,1V6.57Z"
          fill="url(#ba420277-700e-42cc-9de9-5388a5c16e54)" />
      </svg>`

  protected gmailIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 49.4 512 399.42" height="100%"  width="100%">
            <g fill="none" fill-rule="evenodd">
              <g fill-rule="nonzero">
                <path fill="#4285f4"
                  d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z" />
                <path fill="#34a853"
                  d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z" />
                <path fill="#fbbc04" d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z" />
              </g>
              <path fill="#ea4335" d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z" />
              <path fill="#c5221f" fill-rule="nonzero"
                d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z" />
            </g>
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
      data: {
        datasets: [
          {
            backgroundColor: [
              '#50BED795',
              '#41AAAA95',
              '#b52e3195',
              '#C3002F95',
              '#F1502F95',
              '#605ca995',
              '#de3d8195',
              '#d3d3d39f',
              '#0080FF95'
            ],
            data: [45, 85, 85, 55, 66, 75, 70, 60, 37]
          }
        ],
        labels: ['SimaticIT', 'Opcenter', 'AngularJS', 'Angular', 'Git', '.Net/.Net Framework', 'Entity Framework', 'SQL Server', 'Azure DevOps']
      },
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
                      case '.Net/.Net Framework': return this.dotnetIcon
                      case 'Angular':
                      case 'AngularJS': return this.angularIcon
                      case 'Azure DevOps': return this.devOpsIcon
                      case 'Opcenter':
                      case 'SimaticIT': return this.siemensIcon
                      case 'Git':{
                        const [_, git] = bootstrapGit.split('svg ')
                        return `<svg height="100%" width="100%" style="color: #F1502F" ${git}`
                      }
                      case 'SQL Server': {
                        const [_, sqlServer] = svglSqlServer.split('svg ')
                        return `<svg height="100%" width="100%" style="color: #F1502F" ${sqlServer}`
                      }
                      case 'Entity Framework': {
                        const [_, ef] = svglCsharp.split('svg ')
                        return `<svg height="100%" width="100%" style="color: #F1502F" ${ef}`
                      }
                      default: return ''
                    }
                  })()}</div>`

                  if (title === '.Net/.Net Framework') {
                    let element: any = document.createElement('ng-icon')
                    element.name = 'simpleSiemens'
                    td.append(element)
                  }

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