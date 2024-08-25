import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import * as LZString from 'lz-string';


@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    FormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask({})],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

  constructor(private http: HttpClient, private dataService: DataService) { }

  
  ngOnInit(){
    this.onGetCategorias()
  }
  
  conta:any = JSON.parse(this.dataService.conta)

  produto:any = {
    id_conta: this.conta._id,
    nome: "",
    descricao: "",
    id_categoria: "",
    preco: "",
    ativo: true
  }

  images: any = []
  imgInput: string = ""
  indexImageSelect: any = undefined

  categorias:any  = []
  produtos:any    = []

  larguraImg: any = 0
  alturaImg: any  = 0

  pesquisaAlerta: string = ""

  clickAlerta: boolean = false
  
  edicaoProduto: boolean  = false

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
    if (func == "delete"){
      this.onDeleteProduto()
    }
  }

  changeAlertaPequeno(){
    this.viewAlertaPequeno = true
    setTimeout(() => {
      this.viewAlertaPequeno = false
    }, 5000);
  }

  onAbrirAlertaDelete(){
    this.alertaGrande = {
      msg: "Tem certeza de que deseja excluir este produto?",
      btns: [
        {
          text: "Excluir",
          function: "delete"
        },
        {
          text: "Cancelar"
        }
      ]
    }
    this.changeAlertaGrande()
  }

  onFecharAlertaLista(){
    if (this.clickAlerta){
      this.clickAlerta = false
    } else {
      this.pesquisaAlerta = ""
      this.viewAlertaLista = false
    }
  }

  onBuscarCategoria(){
    this.categorias = this.produtos.filter((item: any) => item.nome.toLowerCase().includes(this.pesquisaAlerta.toLowerCase()))
  }

  onSelectCategoria(item: any){
    this.produto.id_categoria = item
    this.clickAlerta = false
    this.onFecharAlertaLista()
  }

  transformarImgB64(event: any){
    let files = event.target.files

    if (files.length + this.images.length > 5 && this.indexImageSelect == undefined){
      this.alertaPequeno = "Selecione no máximo 5 arquivos!"
      this.changeAlertaPequeno()
      return
    }

    for (let file of files){
    // let file: File = event.target.files[0];
      if (file) {
        const reader: FileReader = new FileReader();
        reader.onloadend = (e: any) => {
          const base64String: string = e.target.result;

          function resizeImage(base64String: string, maxWidth: number, maxHeight: number): Promise<any> {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
          
                if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
                }
          
                if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight;
                }
          
                canvas.width = width;
                canvas.height = height;
                const ctx: any | null = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
          
                resolve({ resizedBase64String: canvas.toDataURL(file.type), width: width, height: height });
              };
              img.onerror = (error) => {
                reject(error);
              };
              img.src = base64String;
            });
          }

          resizeImage(base64String, 250, 250)
          .then((res) => {
            this.larguraImg   = res.width
            this.alturaImg    = res.height
            if (this.indexImageSelect == undefined){
              this.images.push({
                id_conta: this.conta._id,
                base64: res.resizedBase64String,
                altura: this.alturaImg,
                largura: this.larguraImg
              })
            } else {
              this.images[this.indexImageSelect] = {
                id_conta: this.conta._id,
                base64: res.resizedBase64String,
                altura: this.alturaImg,
                largura: this.larguraImg
              }
              this.indexImageSelect = undefined
            }
            this.imgInput = ""
          })
          .catch((error) => {
            console.error('Erro ao redimensionar imagem:', error);
          });
        }
        reader.readAsDataURL(file);
      }
    }
  }

  onSelectImage(index: number){
    this.indexImageSelect = index
  }

  onRemoveImg(index: number){
    this.images.splice(index, 1)
  }

  onNovoProduto(){
    if (this.categorias.length == 0){
      this.alertaPequeno = "Cadastre alguma categoria!"
      this.changeAlertaPequeno()
    } else {
      this.edicaoProduto = true
    }
  }

  onEditProduto(item: any){
    this.produto = item
    // this.produto.id_categoria = this.produto.id_categoria._id

    this.http.get(`${this.dataService.linkApi}/imagens-produto/${this.produto._id}`).subscribe((res: any) => {
      try {
        this.images = res
      } catch (error) {
        console.log(error)
      }
    })

    this.edicaoProduto = true
  }

  onGetCategorias(){
    this.http.get(`${this.dataService.linkApi}/default/model_Categorias/${this.conta._id}`).subscribe((res: any) => {
      try {
        this.categorias = res
        this.onGetProdutos()
      } catch (error) {
        console.log(error)
      }
    })
  }

  onGetProdutos(){
    this.http.get(`${this.dataService.linkApi}/default/model_Produtos/${this.conta._id}`).subscribe((res: any) => {
      try {
        for (let produto of res){
          produto.preco = produto.preco.toFixed(2).replace(".", ",")
          produto.id_categoria = this.categorias.filter((item: any) => item._id == produto.id_categoria)[0]
        }
        this.produtos = res
      } catch (error) {
        console.log(error)
      }
    })
  }

  onPostProduto(){
    if (this.produto.nome == "" || this.produto.id_categoria == "" || this.produto.preco == ""){
      this.alertaPequeno = "Preencha todos os campos!"
      this.changeAlertaPequeno()
      return
    }

    if (isNaN(parseFloat(this.produto.preco))){
      this.alertaPequeno = "Preço inválida!"
      this.changeAlertaPequeno()
      return
    }

    this.produto.id_categoria = this.produto.id_categoria._id
    this.produto.preco = parseFloat(this.produto.preco.replace(",", ".")).toFixed(2)

    if (this.produto._id == undefined){
      this.http.post(`${this.dataService.linkApi}/default/model_Produtos`, this.produto).subscribe((res: any) => {
        try {
          for (let i = 0; i < this.images.length; i++){
            this.images[i].index = i
            this.images[i].id_produto = res._id
            this.http.post(`${this.dataService.linkApi}/default/model_ImagensProduto`, this.images[i]).subscribe((res: any) => {
              try {
                // console.log(res)
              } catch (error) {
                console.log(error)
              }
            })
          }
          this.onCancelar()
          this.alertaPequeno = "Produto salvo com sucesso!"
          this.changeAlertaPequeno()
        } catch (error) {
          console.log(error)
        }
      }, (error) => {
        if (error.status == 413){
          this.alertaPequeno = "Imagem muito pesada!"
          this.changeAlertaPequeno()
        }
      })
    } else {
      this.http.delete(`${this.dataService.linkApi}/imagens-produto/${this.produto._id}`).subscribe((res: any) => {
        // console.log(res)
      })
      this.http.put(`${this.dataService.linkApi}/default/model_Produtos/${this.produto._id}`, this.produto).subscribe((res: any) => {
        try {
          for (let i = 0; i < this.images.length; i++){
            this.images[i].index = i
            this.images[i].id_produto = res._id
            this.http.post(`${this.dataService.linkApi}/default/model_ImagensProduto`, this.images[i]).subscribe((res: any) => {
              try {
                // console.log(res)
              } catch (error) {
                console.log(error)
              }
            })
          }
          this.onCancelar()
          this.alertaPequeno = "Produto salvo com sucesso!"
          this.changeAlertaPequeno()
        } catch (error) {
          console.log(error)
        }
      }, (error) => {
        if (error.status == 413){
          this.alertaPequeno = "Imagem muito pesada!"
          this.changeAlertaPequeno()
        }
      })
    }
  }

  onDeleteProduto(){
    this.http.delete(`${this.dataService.linkApi}/imagens-produto/${this.produto._id}`).subscribe((res: any) => { 
      try {
        this.http.delete(`${this.dataService.linkApi}/default/model_Produtos/${this.produto._id}`).subscribe((res: any) => {
          try {
            this.onCancelar()
            this.alertaPequeno = "Produto excluído com sucesso!"
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
    this.produto = {
      id_conta: this.conta._id,
      nome: "",
      descricao: "",
      id_categoria: "",
      preco: "",
      ativo: true
    }
    this.images = []
    this.onGetProdutos()
    this.edicaoProduto = false
  }

}