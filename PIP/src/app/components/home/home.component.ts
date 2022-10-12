import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FuncionesService } from 'src/app/services/funciones.service';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { PIPModel } from 'src/app/models/PIP.model';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {
  public timerInterval: any;
  public asignar: boolean = true
  mesas: any
  idpip: any
  equipos: any
  nombre: any
  mesa: any
  equipo: any
  data: any
  datastatus: any = []
  dataCantidad: any = []
  hide: boolean = true
  disableAsignado: boolean = true
  disableRecibido: boolean = true
  disableCapturado: boolean = true
  disableCancelar: boolean = true
  susbcription: Subscription;
  model = new PIPModel
  constructor(private servicio: FuncionesService) {
  }
  ngOnDestroy(): void {
    clearInterval(this.timerInterval)
  }
  ngAfterContentInit(): void {
    this.getMesas()
  }
  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.servicio.getEquipoCount(this.mesa, this.equipo).pipe(take(1)).subscribe(resp => {
        console.log(resp);
        this.data = resp
        this.grafica(this.data)
      })
    }, 1000)
  }
  grafica(data) {
    this.datastatus = []
    this.dataCantidad = []
    data.forEach((element: any) => {
      data.status = element
      this.datastatus.push(element.status)
      this.dataCantidad.push(element.repetidos)

    });

    let chartDom = document.getElementById('main')!;
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
  Asignar(pip) {
    console.log(this.idpip);
    this.model.status = "Asignado"


    this.servicio.editarStatus(this.model, this.idpip)


    this.getpip(pip)

  }
  Recibir(pip) {
    console.log(this.idpip);
    this.model.status = "Recibido"
    this.servicio.editarStatus(this.model, this.idpip)
    /*  
     this.servicio.getEquipoCount(this.mesa, this.equipo).subscribe( resp => {
       console.log(resp);
       this.data = resp
       this.grafica(this.data)
     }) */
    this.getpip(pip)
  }
  Capturar(pip) {
    console.log(this.idpip);
    this.model.status = "Capturado"
    this.servicio.editarStatus(this.model, this.idpip)

    /*   this.servicio.getEquipoCount(this.mesa, this.equipo).subscribe( resp => {
        console.log(resp);
        this.data = resp
        this.grafica(this.data)
      }) */
    this.getpip(pip)
  }
  Cancelar(pip) {
    console.log(this.idpip);
    this.model.status = "Cancelado"
    this.servicio.editarStatus(this.model, this.idpip)

    /* this.servicio.getEquipoCount(this.mesa, this.equipo).subscribe( resp => {
      console.log(resp);
      this.data = resp
      this.grafica(this.data)
    }) */
    this.getpip(pip)
  }
  getpip(pip) {



    this.servicio.getPIPsMesa(pip).subscribe((resp: any) => {
      
      if (resp[0].x.mesa == this.mesa && resp[0].x.team == this.equipo) {

        this.servicio.getPIP(pip).subscribe((resp: any) => {
          /* console.log(resp.status); */
          this.idpip = resp.id
          switch (resp.status) {
            case "Pendiente":
              this.disableAsignado = false
              this.disableRecibido = true
              this.disableCapturado = true
              this.disableCancelar = false
              break;
            case "Asignado":
              this.disableAsignado = true
              this.disableRecibido = false
              this.disableCapturado = true
              this.disableCancelar = false
              break;
            case "Recibido":
              this.disableAsignado = true
              this.disableRecibido = true
              this.disableCapturado = false
              this.disableCancelar = false
              break;
            case "Capturado":
              this.disableAsignado = true
              this.disableRecibido = true
              this.disableCapturado = true
              this.disableCancelar = false
              break;

            default:
              break;
          }
        })
      }
      else {

        alert("no existe PI en la mesa y equipo seleccionados")


      }
    })

  }
  getMesas() {
    this.servicio.getMesas().subscribe(resp => {
      console.log(resp);

      this.mesas = resp
      this.mesas.sort()
    })
  }
  selectMesa(mesa) {
    this.servicio.getMesaEquipos(mesa).subscribe(resp => {
      console.log(resp);

      this.equipos = resp
    })
  }
  verEquipoInfo() {
    this.mesa = (<HTMLInputElement>document.getElementById("Mesa")).value;
    this.equipo = (<HTMLInputElement>document.getElementById("Equipo")).value;
    if(this.equipo == 0){
      this.asignar = false
    }else {
      this.asignar = true
    }
    
    this.servicio.getEquipoInfo(this.mesa, this.equipo).subscribe((resp: any) => {
      console.log(resp[0].key);
      this.nombre = resp[0].key
      document.getElementById("nombre").innerHTML = this.nombre

    })
    this.servicio.getEquipoCount(this.mesa, this.equipo).subscribe(resp => {
      console.log(resp);
      this.data = resp
      this.grafica(this.data)
    })
  }
  selectTeam() {

    this.datastatus = []
    this.dataCantidad = []
    this.hide = false
    this.verEquipoInfo()
    
    
  }
  Transferir(pip, team)
  {
    this.servicio.getPIPsMesa(pip).subscribe((resp: any) => {
      
      if (resp[0].x.mesa == this.mesa && resp[0].x.team == this.equipo) {
       
        this.servicio.teamInfo(team).subscribe( (resp: any )=> {
          console.log(resp);
          this.model.team = resp.team
          this.model.teamname = resp.teamname
          this.model.lider = resp.lider
          this.model.mesa = resp.mesa
          this.model.auditor = resp.auditor
          this.servicio.asignarPI(pip, this.model)
        })
       
        
        
       
       
      }
      else {

        alert("no existe PI en la mesa y equipo seleccionados")


      }
    })
    
  }

}
