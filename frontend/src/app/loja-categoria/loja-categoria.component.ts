import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-loja-categoria',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './loja-categoria.component.html',
  styleUrl: './loja-categoria.component.scss'
})
export class LojaCategoriaComponent {

  constructor( 
    private http: HttpClient, 
    private dataService: DataService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.categoria._id = params["id_categoria"]
    })

    this.route.parent?.params.subscribe(params => {
      this.onGetLoja(params["path_loja"])
      this.linkParaProduto = `${this.dataService.linkFront}/loja/${params["path_loja"]}/produto/`
    })

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      window.location.reload()
      // this.route.params.subscribe(params => {
      //   this.categoria._id = params["id_categoria"]
      // })
  
      // this.route.parent?.params.subscribe(params => {
      //   this.onGetLoja(params["path_loja"])
      //   this.linkParaProduto = `${this.dataService.linkFront}/loja/${params["path_loja"]}/produto/`
      // })
    })
  }

  loja: any = {}

  categoria: any = {}

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
          
          // this.onGetProdutos()
          this.onGetCategoria()
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  onGetCategoria(){
    this.http.get(`${this.dataService.linkApi}/default-getOne/model_Categorias/${this.categoria._id}`).subscribe((res: any) => {
      try {
        this.categoria = res[0]
        this.onGetProdutos()
      } catch (error) {
        console.log(error)
      }
    })
  }

  onGetProdutos(){
    this.http.get(`${this.dataService.linkApi}/default/model_Produtos/${this.loja._id}`).subscribe((res: any) => {
      try {
        res = res.filter((item: any) => item.ativo && item.id_categoria == this.categoria._id)
        // for (let produto of res){
        //   produto.preco = produto.preco.toFixed(2).replace(".", ",")
        // }
        this.produtos = res
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
