import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { LojaService } from '../loja.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-loja-busca',
  standalone: true,
  imports: [],
  templateUrl: './loja-busca.component.html',
  styleUrl: './loja-busca.component.scss'
})
export class LojaBuscaComponent {

  constructor( private http: HttpClient, 
    private dataService: DataService,  
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.busca = params["busca"]
    })

    this.route.parent?.params.subscribe(params => {
      this.onGetLoja(params["path_loja"])
      this.linkParaProduto = `${this.dataService.linkFront}/loja/${params["path_loja"]}/produto/`
    })

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      window.location.reload()
      // this.route.params.subscribe(params => {
      //   this.busca = params["busca"]
      // })
  
      // this.route.parent?.params.subscribe(params => {
      //   this.onGetLoja(params["path_loja"])
      //   this.linkParaProduto = `${this.dataService.linkFront}/loja/${params["path_loja"]}/produto/`
      // })
    })
  }

  loja: any = {}

  busca: string = ""

  produtos: any         = []

  linkParaChat: string = ""
  linkParaProduto: string = ""

  menuAberto: boolean = false

  onGetLoja(path_loja: any){
    this.http.get(`${this.dataService.linkApi}/conta/${path_loja}`).subscribe((res: any) => {
      try {
        if (res != null){
          this.loja = res
          this.linkParaChat = `https://web.whatsapp.com/send?phone=55${this.loja.telefone}&text=Olá+tudo+bem,+estou+com+interesse+no+produto+`
          
          this.onGetProdutos()
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  onGetProdutos(){
    this.http.get(`${this.dataService.linkApi}/default/model_Produtos/${this.loja._id}`).subscribe((res: any) => {
      try {
        res = res.filter((item: any) => item.ativo && item.nome.toLowerCase().includes(this.busca.toLowerCase()))
        // for (let produto of res){
        //   produto.preco = produto.preco.toFixed(2).replace(".", ",")
        // }
        this.produtos = res.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
        this.onGetImagensProduto()
      } catch (error) {
        console.log(error)
      }
    })
  }

  onGetImagensProduto(){
    this.http.get(`${this.dataService.linkApi}/imagens-produto/index-0/${this.loja._id}`).subscribe((res: any) => {
      try {
        for (let produto of this.produtos){
          produto.image = res.find((image: any) => image.id_produto == produto._id)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

}
