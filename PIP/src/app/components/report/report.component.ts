import { Component, OnInit } from '@angular/core';
import { FuncionesService } from 'src/app/services/funciones.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  pips: any
  page: number = 1;
  constructor(private servicio: FuncionesService) {
    this.getPIPs()
   }

  ngOnInit(): void {
    this.page = 1
    
  }

  descargar()
  {
    this.servicio.getAllPIP().subscribe( (data: any) => {
      const readyToExport = data;

      const workBook = XLSX.utils.book_new(); // create a new blank book

      const workSheet = XLSX.utils.json_to_sheet(readyToExport);

      XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book

      XLSX.writeFile(workBook, 'registros.xlsx'); // initiate a file download in browser
    })
  }
getPIPs()
{
  this.servicio.getAllPIP().subscribe(resp => {
    console.log(resp);
    
    this.pips = resp
  })
}
}
