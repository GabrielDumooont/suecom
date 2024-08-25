import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { LojaService } from '../loja.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loja-produto',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './loja-produto.component.html',
  styleUrl: './loja-produto.component.scss'
})
export class LojaProdutoComponent {

  constructor(private http: HttpClient, private dataService: DataService, private lojaService: LojaService,private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.parent?.params.subscribe(params => {
      this.onGetLoja(params["path_loja"])
      this.linkParaProduto = `${this.dataService.linkFront}/loja/${params["path_loja"]}/produto/`
    })
  }

  loja: any             = {}
  produto: any          = {}
  imagensProduto: any   = []

  produtos: any           = []
  produtosSimilares: any  = []
  produtosOutros: any     = []

  imagemPrincipal: any = {}

  linkParaProduto: string = ""

  onGetLoja(path_loja: any){
    this.http.get(`${this.dataService.linkApi}/conta/${path_loja}`).subscribe((res: any) => {
      try {
        if (res != null){
          this.loja = res
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
        this.route.params.subscribe(params => {
          this.produto = res.find((item: any) => item._id == params["id_produto"])
        })
        for (let produto of res){
          produto.preco = produto.preco.toFixed(2).replace(".", ",")

          if (produto._id != this.produto._id){
            if (produto.id_categoria == this.produto.id_categoria){
              this.produtosSimilares.push(produto)
            } else {
              this.produtosOutros.push(produto)
            }
          }
        }
        this.produtos = res
        this.onGetImagensProduto()
        this.onGetImageProdutos()
      } catch (error) {
        console.log(error)
      }
    })
  }

  onGetImagensProduto(){
    this.http.get(`${this.dataService.linkApi}/imagens-produto/${this.produto._id}`).subscribe((res: any) => {
      try {
        this.imagensProduto = res
        this.imagemPrincipal = res[0]
      } catch (error) {
        console.log(error)
      }
    })
  }

  onGetImageProdutos(){
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
