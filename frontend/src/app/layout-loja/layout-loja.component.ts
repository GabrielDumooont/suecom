import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { LojaService } from '../loja.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-layout-loja',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './layout-loja.component.html',
  styleUrl: './layout-loja.component.scss'
})
export class LayoutLojaComponent {

  constructor(private router: Router, private http: HttpClient, private dataService: DataService, private lojaService: LojaService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.onGetLoja(params["path_loja"])
    })
  }

  loja: any = {}

  categorias: any       = []
  produtos: any         = []
  produtosPesquisa: any = []

  linkParaChat: string    = ""

  menuAberto: boolean = false
  pesquisa: string    = ""

  clickNav = false

  onChangeMenu(){
    if (this.clickNav){
      this.clickNav = false
    } else {
      if (this.menuAberto){
        this.menuAberto = false
      } else {
        this.menuAberto = true
      }
    }
  }

  onBuscarProduto(){
    this.dataService.onRoute(`/loja/${this.loja.path_loja}/busca/${this.pesquisa}`)
  }

  onSelectCategoria(categoria: any){
    if (categoria == ""){
      this.dataService.onRoute(`/loja/${this.loja.path_loja}`)
    } else {
      this.dataService.onRoute(`/loja/${this.loja.path_loja}/categoria/${categoria.nome.toLowerCase()}/${categoria._id}`)
      // this.router.navigateByUrl(`/loja/${this.loja.path_loja}/categoria/${categoria.nome.toLowerCase()}/${categoria._id}`, { skipLocationChange: true })
    }
    if (this.menuAberto){
      this.onChangeMenu()
    }
  }

  onGetLoja(path_loja: any){
    this.http.get(`${this.dataService.linkApi}/conta/${path_loja}`).subscribe((res: any) => {
      try {
        if (res != null){
          this.loja = res
          this.titleService.setTitle(this.loja.nome_loja)
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
