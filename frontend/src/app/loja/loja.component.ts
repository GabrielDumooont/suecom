import { Component, ViewChildren, ElementRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { LojaService } from '../loja.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.scss'
})
export class LojaComponent {

  constructor(private http: HttpClient, private dataService: DataService, private lojaService: LojaService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.onGetLoja(params["path_loja"])
      this.linkParaProduto = `${this.dataService.linkFront}/loja/${params["path_loja"]}/produto/`
    })
  }

  loja: any = {}

  categorias: any       = []
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
        for (let produto of res){
          produto.preco = produto.preco.toFixed(2).replace(".", ",")
        }
        res = res.filter((item: any) => item.ativo)
        this.produtos = res
        this.onGetCategorias()
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

  onGetCategorias(){
    this.http.get(`${this.dataService.linkApi}/default/model_Categorias/${this.loja._id}`).subscribe((res: any) => {
      try {
        for (let categoria of res){
          if (this.produtos.filter((item: any) => item.id_categoria == categoria._id).length > 0){
            this.categorias.push(categoria)
          }
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

}
