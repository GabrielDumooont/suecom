import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import moment from 'moment';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [
    FormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask({})],
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.scss'
})
export class VendasComponent {

  constructor(private http: HttpClient, private dataService: DataService, ) {}

  ngOnInit(){
    this.onGetCategorias()
    this.onGetProdutos()
    this.onGetVendas()
  }

  conta:any = JSON.parse(this.dataService.conta)

  venda: any  = {
    id_conta: this.conta._id,
    nome_cliente: "",
    telefone_cliente: "",
    data: moment().format("YYYY-MM-DD HH:mm"),
    total: 0
  }
  produto: any = {
    id_conta: this.conta._id,
    id_venda: "",
    nome: "",
    preco: "",
    quantidade: "",
    total: 0
  }

  vendas: any           = []
  categorias: any       = []
  produtos: any         = []
  produtos_venda: any   = []
  produtos_alerta: any  = []

  index_produtoSelecionado: number = 0

  pesquisaAlerta: string = ""

  clickInput: boolean = false

  edicaoVenda: boolean = false

  viewAlertaGrande: boolean     = false
  alertaGrande: any             = {}
  viewAlertaPequeno:boolean     = false
  alertaPequeno                 = ""
  viewAlertaLista: boolean      = false

  changeAlertaGrande(){
    if (this.viewAlertaGrande){
      this.viewAlertaGrande = false
    } else {
      this.viewAlertaGrande = true
    }
  }

  functionAlertaGrande(func: string){
    if (func == "removerProduto"){
      this.onRemoverProduto()
    }

    if (func == "deletarVenda"){
      this.onDeleteVenda()
    }
  }

  changeAlertaPequeno(){
    this.viewAlertaPequeno = true
    setTimeout(() => {
      this.viewAlertaPequeno = false
    }, 5000);
  }

  onFecharAlertaLista(){
    if (this.clickInput){
      this.clickInput = false
    } else {
      this.pesquisaAlerta = ""
      this.produtos_alerta = this.produtos
      this.viewAlertaLista = false
    }
  }

  onAbrirAlertaDeletarVenda(){
    this.alertaGrande = {
      msg: "Tem certeza de que deseja excluir esta venda?",
      btns: [
        {
          text: "Excluir",
          function: "deletarVenda"
        },
        {
          text: "Cancelar"
        }
      ]
    }
    this.changeAlertaGrande()
  }

  onAbrirAlertaRemoverProduto(){
    this.alertaGrande = {
      msg: "Deseja remover esse produto?",
      btns: [
        {
          text: "Remover",
          function: "removerProduto"
        },
        {
          text: "Cancelar"
        }
      ]
    }
    this.viewAlertaGrande = true
  }

  onNovaVenda(){
    if (this.produtos.length > 0){
      this.edicaoVenda = true
    } else {
      this.alertaPequeno = "Cadastre algum produto!"
      this.changeAlertaPequeno()
    }
  }

  onEditVenda(item: any){
    this.venda = item
    // this.venda.data = moment(this.venda).format("YYYY-MM-DD HH:mm")
    this.onGetProdutosVenda()
    this.edicaoVenda = true
  }

  onBuscarProduto(){
    this.produtos_alerta = this.produtos.filter((item: any) => item.nome.toLowerCase().includes(this.pesquisaAlerta.toLowerCase()))
  }

  onSelectProduto(item: any){
    this.produto.nome   = item.nome
    this.produto.preco  = item.preco
  }

  onAddProduto(){
    if (this.produto.nome == "" || this.produto.quantidade == ""){
      this.alertaPequeno = "Preencha todos os campos!"
      this.changeAlertaPequeno()
      return
    }

    if (isNaN(this.produto.quantidade)){
      this.alertaPequeno = "Quantidade inválida!"
      this.changeAlertaPequeno()
      return
    }

    this.produto.quantidade = parseFloat(this.produto.quantidade)
    this.produto.total = this.produto.quantidade * this.produto.preco
    this.produto.total = this.produto.total.toFixed(2).replace(".", ",")
    this.produtos_venda.push(this.produto)
    this.produto = {
      id_conta: this.conta._id,
      id_venda: "",
      nome: "",
      preco: "",
      quantidade: "",
      total: 0
    }
  }

  onRemoverProduto(){
    this.produtos_venda.splice(this.index_produtoSelecionado, 1)
  }

  onGetCategorias() {
    this.http.get(`${this.dataService.linkApi}/default/model_Categorias/${this.conta._id}`).subscribe((res: any) => {
      try {
        this.categorias = res
      } catch (error) {
        console.log(error)
      }
    })
  }

  onGetProdutos() {
    this.http.get(`${this.dataService.linkApi}/default/model_Produtos/${this.conta._id}`).subscribe((res: any) => {
      try {
        for (let produto of res){
          produto.id_categoria = this.categorias.filter((item: any) => item._id == produto.id_categoria)[0]
        }
        res = res.filter((item: any) => item.ativo)
        res.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
        this.produtos         = res
        this.produtos_alerta  = res
      } catch (error) {
        console.log(error)
      }
    })
  }

  onGetVendas(){
    this.http.get(`${this.dataService.linkApi}/default/model_Vendas/${this.conta._id}`).subscribe((res: any) => {
      try {
        for (let venda of res){
          venda.total = venda.total.toFixed(2).replace(".", ",")
          venda.data  = moment(venda.data).format("YYYY-MM-DD HH:mm")
        }
        this.vendas = res
      } catch (error) {
        console.log(error)
      }
    })
  }

  onGetProdutosVenda(){
    this.http.get(`${this.dataService.linkApi}/produtos-venda/${this.venda._id}`).subscribe((res: any) => {
      try {
        for (let produto of res){
          produto.total = produto.total.toFixed(2).replace(".", ",")
        }
        this.produtos_venda = res
      } catch (error) {
        console.log(error)
      }
    })
  }

  onPostVenda(){
    if (this.produtos_venda.length == 0){
      this.alertaPequeno = "Adicione algum produto!"
      this.changeAlertaPequeno()
    } else {
      
      this.venda.total = 0
      for (let produto of this.produtos_venda){
        produto.total = parseFloat(produto.total.replace(",", "."))
        this.venda.total = this.venda.total + produto.total
      }
      if (this.venda._id == undefined){
        this.http.post(`${this.dataService.linkApi}/default/model_Vendas`, this.venda).subscribe((res: any) => {
          try {
            for (let produto of this.produtos_venda){
              produto.id_venda = res._id
              this.http.post(`${this.dataService.linkApi}/default/model_ProdutosVenda`, produto).subscribe((res: any) => { 
                try {
                  this.onCancelar()
                  this.alertaPequeno = "Venda salva com sucesso!"
                  this.changeAlertaPequeno()
                } catch (error) {
                  console.log(error)
                }
              })
            }
          } catch (error) {
            console.log(error)
          }
        })
      } else {
        this.http.delete(`${this.dataService.linkApi}/produtos-venda/${this.venda._id}`).subscribe((res: any) => {
          try {
            this.http.put(`${this.dataService.linkApi}/default/model_Vendas/${this.venda._id}`, this.venda).subscribe((res: any) => {
              try {
                for (let produto of this.produtos_venda){
                  produto.id_venda = this.venda._id
                  this.http.post(`${this.dataService.linkApi}/default/model_ProdutosVenda`, produto).subscribe((res: any) => { 
                    try {
                      this.onCancelar()
                      this.alertaPequeno = "Venda salva com sucesso!"
                      this.changeAlertaPequeno()
                    } catch (error) {
                      console.log(error)
                    }
                  })
                }
              } catch (error) {
                console.log(error)
              }
            })
          } catch (error) {
            console.log(error)
          }
        })
      }
    }
  }

  onDeleteVenda(){
    this.http.delete(`${this.dataService.linkApi}/produtos-venda/${this.venda._id}`).subscribe((res: any) => {
      try {
        this.http.delete(`${this.dataService.linkApi}/default/model_Vendas/${this.venda._id}`).subscribe((res: any) => {
          try {
            this.onCancelar()
            this.alertaPequeno = "Venda excluída com sucesso!"
            this.changeAlertaPequeno()
          } catch (error) {
            console.log(error)
          }
        })
      } catch (error) {
        console.log(error)
      }
    })
  }

  onCancelar(){
    this.venda = {
      id_conta: this.conta._id,
      nome_cliente: "",
      telefone_cliente: "",
      data: moment().format("YYYY-MM-DD HH:mm"),
      total: 0
    }
    this.produto = {
      id_conta: this.conta._id,
      id_venda: "",
      nome: "",
      preco: "",
      quantidade: "",
      total: 0
    }
    this.produtos_venda = []

    this.onGetVendas()

    this.edicaoVenda = false
  }

}
