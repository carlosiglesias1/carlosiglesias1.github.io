import { Component } from '@angular/core';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  public images: any

  public cards: {
    title: string,
    imageName: string,
    description: string | null
  }[]

  constructor(private images_svc: ImagesService) {
    this.cards = [
      {
        title: 'Sistemas de administración de líneas de producción',
        imageName: 'lms',
        description: 'Aplicación Web (fullstack WebApp+WebAPI) para integrar consultas de sistemas LMS en entorno MES'
      },
      {
        title: 'Integración MES',
        imageName: 'mes',
        description: 'Implementación personalizada basada en el entorno MES de Siemens; con gestión de órdenes, trazabilidad de lotes y stocks y comunicación en tiempo real con ERP (comunicaciones Planta - Oficina)'
      },
      {
        title: 'Desarrollo ERP',
        imageName: 'erp',
        description: 'Rediseño del menú principal en C# .Net y desarrollo de sistema de actualización automática en clientes.'
      },
      {
        title: 'Desarrollo entorno Oracle/Libra',
        imageName: 'oracle',
        description: 'Desarrollos Fullstack con Oracle Forms y Oracle database para entorno Libra ERP'
      },
    ]

    this.images = {
      lms: ''
    }

    this.images_svc.getImage('lms')
      .subscribe(response => { this.images.lms = response })
    this.images_svc.getImage('mes')
      .subscribe(response => { this.images.mes = response })
  }
}