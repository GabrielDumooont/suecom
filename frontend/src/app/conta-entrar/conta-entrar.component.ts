import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-conta-entrar',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './conta-entrar.component.html',
  styleUrl: './conta-entrar.component.scss'
})

export class ContaEntrarComponent {

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.verificarLoginConta()
  }

  login: any = {
    email: "",
    senha: ""
  }

  viewAlertaPequeno:boolean     = false
  alertaPequeno                 = ""

  changeAlertaPequeno(){
    this.viewAlertaPequeno = true
    setTimeout(() => {
      this.viewAlertaPequeno = false
    }, 5000);
  }

  onLogar() {
    if (this.login.email == "" || this.login.senha == ""){
      this.alertaPequeno = "Preencha todos os campos!"
      this.changeAlertaPequeno()
      return
    }

    this.http.get(`${this.dataService.linkApi}/conta/${this.login.email}/${this.login.senha}`).subscribe((res: any) => {
      try {
        if (res != null){
          localStorage.setItem("loginSuecom", JSON.stringify(res))
          this.dataService.verificarLoginConta()
        } else {
          this.alertaPequeno = "Informações invalidas!"
          this.changeAlertaPequeno()
        }
      } catch (error) {
        console.log(error)
      }
    })

  }

}
