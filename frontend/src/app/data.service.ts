import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router) {}

  conta:any = {}

  linkApi: string   = "http://localhost:3000"
  linkFront: string = "http://localhost:4200"

  verficarLoginLayout() {
    if(localStorage.getItem("loginSuecom") == null){
      this.onRoute("/")
    } else {
      this.conta = localStorage.getItem("loginSuecom")
    }
  }

  verificarLoginConta() {
    if(localStorage.getItem("loginSuecom") == null){
      this.onRoute("/")
    } else {
      this.conta = localStorage.getItem("loginSuecom")
      this.onRoute("/layout/produtos")
    }
  }
  
  onRoute(path: string) {
    this.router.navigate([path]);
  }

}
