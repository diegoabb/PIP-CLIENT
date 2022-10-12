import { AfterContentInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { FuncionesService } from 'src/app/services/funciones.service';
type EChartsOption = echarts.EChartsOption;
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterContentInit, OnInit, OnDestroy {
  public timerInterval: any;
  data: any
  datastatus: any = []
  dataCantidad: any = []
  constructor(private servicio: FuncionesService) {
    this.timerInterval = setInterval(() => 
    {
      this.servicio.getCountAll().subscribe( resp => {
        this.data = resp
        this.grafica(this.data)
      })
    }, 1000)
    
    
   }
  ngOnDestroy(): void {
    clearInterval(this.timerInterval)
  }
  ngAfterContentInit(): void {
    
   
  }

  ngOnInit(): void {
    
   
  }
  
  grafica(data) {
    this.datastatus = []
    this.dataCantidad = []
    data.forEach((element: any) => {
      data.status = element
      this.datastatus.push(element.status)
      this.dataCantidad.push(element.repetidos)

    });

    let chartDom = document.getElementById('reporte')!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
      title: {
        text: 'Grafica'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: this.datastatus
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.dataCantidad,
          type: 'bar'
        }
      ]
    };
    option && myChart.setOption(option);
  }
}
