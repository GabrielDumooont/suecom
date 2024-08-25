import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-conta-compartilhar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './conta-compartilhar.component.html',
  styleUrl: './conta-compartilhar.component.scss'
})
export class ContaCompartilharComponent {

  constructor(private dataService: DataService) { }

  conta: any        = JSON.parse(this.dataService.conta)
  // nomeLoja: string  = this.conta.nome_loja
  linkLoja: any     = `http://localhost:4200/loja/${this.conta.path_loja}` 

  viewAlertaPequeno:boolean     = false
  alertaPequeno                 = ""
  
  changeAlertaPequeno(){
    this.viewAlertaPequeno = true
    setTimeout(() => {
      this.viewAlertaPequeno = false
    }, 5000);
  }

  copiarLinkLoja(){
    navigator.clipboard.writeText(this.linkLoja)
    this.alertaPequeno = "Link copiado!"
    this.changeAlertaPequeno()
  }

}
