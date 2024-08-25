import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-conta-cadastrar',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask({})],
  templateUrl: './conta-cadastrar.component.html',
  styleUrl: './conta-cadastrar.component.scss'
})
export class ContaCadastrarComponent {

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(){
  }

  login: any = {
    nome_loja:        "",
    cor_loja:         "#1a1a1a",
    modoEscuro_loja:  false,
    telefone:         "",
    email:            "",
    senha:            "",
    image:            "",
    path_loja:        ""
  }

  viewAlertaPequeno:boolean     = false
  alertaPequeno                 = ""

  changeAlertaPequeno(){
    this.viewAlertaPequeno = true
    setTimeout(() => {
      this.viewAlertaPequeno = false
    }, 5000);
  }

  onCadastrar() {
    if (this.login.nome == "" || this.login.telefone == "" || this.login.email == "" || this.login.senha == ""){
      this.alertaPequeno = "Preencha todos os campos!"
      this.changeAlertaPequeno()
      return
    }

    if (this.login.telefone.length != 11){
      this.alertaPequeno = "Telefone inválido!"
      this.changeAlertaPequeno()
      return
    }

    let regex = /[^\w\s]/;
    if (regex.test(this.login.nome_loja) || this.login.nome_loja.includes('_')){
      this.alertaPequeno = "Nome da loja inválido!"
      this.changeAlertaPequeno()
      return
    }

    let re = /\S+@\S+\.\S+/;
    if (!re.test(this.login.email)){
      this.alertaPequeno = "E-mail inválido!"
      this.changeAlertaPequeno()
      return
    }

    this.login.path_loja = this.login.nome_loja.replace(/ /g, "").toLowerCase()

    this.http.post(`${this.dataService.linkApi}/conta`, this.login).subscribe((res: any) => {
      try {
        if(res._id != undefined){
          localStorage.setItem("loginSuecom", JSON.stringify(res))
          this.dataService.verificarLoginConta()
        } else {
          this.alertaPequeno = res.msg
          this.changeAlertaPequeno()
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

}
