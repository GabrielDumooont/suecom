import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-conta-configuracoes',
  standalone: true,
  imports: [
    FormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask({})],
  templateUrl: './conta-configuracoes.component.html',
  styleUrl: './conta-configuracoes.component.scss'
})
export class ContaConfiguracoesComponent {

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(){
    // if (this.conta.modoEscuro_loja == "false"){
    //   this.conta.modoEscuro_loja = false
    // } else {
    //   this.conta.modoEscuro_loja = true
    // }
  }

  conta: any = JSON.parse(this.dataService.conta)
  imgInput: string = ""

  larguraImg: any = 0
  alturaImg: any  = 0

  viewAlertaGrande: boolean     = false
  alertaGrande: any             = {}
  viewAlertaPequeno:boolean     = false
  alertaPequeno                 = ""

  changeAlertaGrande(){
    if (this.viewAlertaGrande){
      this.viewAlertaGrande = false
    } else {
      this.viewAlertaGrande = true
    }
  }

  functionAlertaGrande(func: string){
    if (func == "delete"){
      this.onDeleteConta()
    } else if (func == "sair"){
      this.onSairConta()
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
      msg: "Tem certeza de que deseja excluir esta conta?",
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

  onAbrirAlertaSair(){
    this.alertaGrande = {
      msg: "Tem certeza de que deseja sair desta conta?",
      btns: [
        {
          text: "Sair",
          function: "sair"
        },
        {
          text: "Cancelar"
        }
      ]
    }
    this.changeAlertaGrande()
  }

  transformarImgB64(event: any){
    const file: File = event.target.files[0];
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

        resizeImage(base64String, 300, 300)
        .then((res) => {
          // console.log(res.resizedBase64String)
          this.larguraImg   = res.width
          this.alturaImg    = res.height
          this.conta.image  = res.resizedBase64String
          this.imgInput = ""
        })
        .catch((error) => {
          console.error('Erro ao redimensionar imagem:', error);
        });
      }
      reader.readAsDataURL(file);
    }
  }

  onPutConta(){
    if (this.conta.nome_loja == "" || this.conta.telefone == "" || this.conta.senha == ""){
      this.alertaPequeno = "Preencha todos os campos!"
      this.changeAlertaPequeno()
      return
    }

    if (this.conta.telefone.length != 11){
      this.alertaPequeno = "Telefone inválido!"
      this.changeAlertaPequeno()
      return
    }

    this.http.put(`${this.dataService.linkApi}/conta`, this.conta).subscribe((res: any) => { 
      try {
        if (res._id == undefined){
          this.alertaPequeno = res.msg
        } else {
          localStorage.setItem("loginSuecom", JSON.stringify(this.conta))
          this.dataService.verficarLoginLayout()
          this.alertaPequeno = "Informações da conta alteradas com sucesso!"
          this.changeAlertaPequeno()
        }
      } catch (error) {
        
      }
    }, (error) => {
      if (error.status == 413){
        this.alertaPequeno = "Imagem muito pesada!"
        this.changeAlertaPequeno()
      }
    })
  }

  onDeleteConta(){
    this.http.delete(`${this.dataService.linkApi}/default/deleteAll/model_ProdutosVenda/${this.conta._id}`).subscribe((res: any) => { 
      try {
      } catch (error) {
        console.log(error)
      }
    })
    this.http.delete(`${this.dataService.linkApi}/default/deleteAll/model_Vendas/${this.conta._id}`).subscribe((res: any) => { 
      try {
      } catch (error) {
        console.log(error)
      }
    })
    this.http.delete(`${this.dataService.linkApi}/default/deleteAll/model_ImagensProduto/${this.conta._id}`).subscribe((res: any) => { 
      try {
      } catch (error) {
        console.log(error)
      }
    })
    this.http.delete(`${this.dataService.linkApi}/default/deleteAll/model_Produtos/${this.conta._id}`).subscribe((res: any) => { 
      try {
      } catch (error) {
        console.log(error)
      }
    })
    this.http.delete(`${this.dataService.linkApi}/default/deleteAll/model_Categorias/${this.conta._id}`).subscribe((res: any) => { 
      try {
      } catch (error) {
        console.log(error)
      }
    })
    this.http.delete(`${this.dataService.linkApi}/default/model_Conta/${this.conta._id}`).subscribe((res: any) => { 
      try {
        this.onSairConta()
      } catch (error) {
        console.log(error)
      }
    })
  }

  onSairConta(){
    localStorage.clear()
    this.dataService.verficarLoginLayout()
  }

}
