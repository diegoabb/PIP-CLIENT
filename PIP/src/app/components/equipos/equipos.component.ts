import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { graficainfo } from 'src/app/models/graficaInfo.model';
import { FuncionesService } from 'src/app/services/funciones.service';
@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit, AfterContentInit, OnDestroy {
  data:  any = []
  equipos: any [] = []
  index: any
  status: any
  Asignados: any = []
  Pendientes: any = []
  Capturados: any = []
  Recibidos: any = []
  Cancelados: any = []
  infoAsignados: any = []
  infoPendientes: any = []
  infoCapturados: any = []
  infoRecibidos: any = []
  infoCancelados: any = []
  /* objeto:  graficainfo[] = [] */
 /*  info: [string, string,string, string, string, string] = ['Team', 'Pendiente', 'Asignado', 'Recibido', 'Capturado', 'Cancelado'] */
  datastatus: any = []
  dataCantidad: any = []
  constructor( private servicio: FuncionesService) {

    
    this.servicio.getStatus().subscribe( resp => {
    
      this.status = resp
      this.status.push('Team')
      
      this.status.unshift(this.status.pop())
     
    })
   }
  ngOnDestroy(): void {
  }
  ngAfterContentInit(): void {
   this.servicio.getCountTeams().subscribe( (resp: any) => {
      /* this.equipos.push(resp.team) */
      
        
        for (let i = 1; i < this.status.length; i++) {
          
          this.servicio.getStatusCount(this.status[i]).subscribe((resp:any) => {
            
            for (let i = 0; i < resp.length; i++) {
              const status = resp[i].status.status;
              const equipo = resp[i].status.teamname
              const repetidos = resp[i].repetidos
              console.log(equipo);
              switch (status) {
                  case "Asignado":
                    this.Asignados.push({"Equipo":equipo, "Status": status, "Repetidos": repetidos})
                    /* console.log(this.Asignados); */
                    
                  break;
                  case "Pendiente":
                    this.Pendientes.push({"Equipo":equipo, "Status": status, "Repetidos": repetidos})
                    /* console.log(this.Pendientes); */
                  break;
                  case "Recibido":
                    this.Recibidos.push({"Equipo":equipo, "Status": status, "Repetidos": repetidos})
                    /* console.log(this.Recibidos); */
                  break;
                  case "Capturado":
                    this.Capturados.push({"Equipo":equipo, "Status": status, "Repetidos": repetidos})
                    /* console.log(this.Capturados); */
                  break;
                  case "Cancelado":
                    this.Cancelados.push({"Equipo":equipo, "Status": status, "Repetidos": repetidos})
                    /* console.log(this.Cancelados); */
                  break;
                default:
                  break;
              }
              
            }
           
          })
           
         } 
        
      })
      /* this.grafica() */
 
  }

  ngOnInit(): void {
  }
  
  
  /* grafica() 
  {
    let chartDom = document.getElementById('equipos')!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
      title: {
        text: 'Grafica'
      },
      tooltip: {},
      dataset: {
        dimensions: ["Equipo", "Status", "Repetidos"],
        source:[this.Pendientes]
      },
      xAxis: {
        type: 'category'
        
      },
      yAxis: {
       
      },
      series: [
        { type: 'bar' }, , { type: 'bar' }, { type: 'bar' }
      ]
    };
    option && myChart.setOption(option);
  } */
    
      
  
  /* }   */
  
}
