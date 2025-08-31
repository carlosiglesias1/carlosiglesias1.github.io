import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { ImagesService } from '../../services/images.service';
import { NotificationService } from 'src/app/services/notification.service';
import { callback } from 'chart.js/dist/helpers/helpers.core';

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
      this.notification.success('Copiado al portapapeles', 1000)
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