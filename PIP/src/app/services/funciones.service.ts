import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  //https://localhost:44396/api/PIP/ http://mx-s-ramturp01.elis.abb.com:2500/api/PIP/
  url = "http://mx-s-ramturp01.elis.abb.com:2500/api/PIP/"
  private _refresh$ = new Subject<void>()
  constructor(private http: HttpClient) { }

 /*  get refresh$()
  {
    return this._refresh$
  } */
  teamInfo(team)
  {
    return this.http.get(`${this.url}TeamInfo?team=${team}`)
  }
  asignarPI(pi, model)
  {
    return this.http.put(`${this.url}asignar/pip?pip=${pi}`,model).subscribe();
  }
  getPIPsMesa(pip)
  {
    return this.http.get(`${this.url}PIPsMesa?pip=${pip}`)
  }

  editarStatus(PIPmodel, id)
  {
    return this.http.put(`${this.url}${id}`, PIPmodel).subscribe();
  }

  getPIP(pip)
  {
    return this.http.get(`${this.url}PIP?pip=${pip}`)
  }
  getAllPIP()
  {
    return this.http.get(`${this.url}`)
  }
  getMesas()
  {
    return this.http.get(`${this.url}Mesa`)
  }
  getMesaEquipos(mesa)
  {
    return this.http.get(`${this.url}MesaPIPTeams?mesa=${mesa}` )
  }
  getEquipoInfo(mesa, equipo)
  {
    return this.http.get(`${this.url}MesaPIP?mesa=${mesa}&team=${equipo}`)
  }
  getEquipoCount(mesa, equipo)
  {
    return this.http.get(`${this.url}MesaPIPCount?mesa=${mesa}&team=${equipo}`) 
  }
  getCountAll()
  {
    return this.http.get(`${this.url}CountAll`)
  }
  getCountAllTeams()
  {
    return this.http.get(`${this.url}CountAllTeams`)
  }
  getCountTeams()
  {
    return this.http.get(`${this.url}CountTeams`)
  }
  getteamPIPCount(team)
  {
    return this.http.get(`${this.url}teamPIPCount?team=${team}`)
  }
  getStatus()
  {
    return this.http.get(`${this.url}Status`)
  }
  getStatusCount(status)
  {
    return this.http.get(`${this.url}StatusCount?status=${status}`)
  }
}
