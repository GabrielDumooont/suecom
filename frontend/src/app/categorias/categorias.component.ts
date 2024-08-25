import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.onGetCategorias()
  }

  conta: any = JSON.parse(this.dataService.conta)

  categoria: any = {
    id_conta: this.conta._id,
    nome: "",
  }

  categorias: any = []
  
  edicaoCategoria: boolean    = false

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
      this.onDeleteCategoria()
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
      msg: "Tem certeza de que deseja excluir esta categoria? A exclusão também removerá todos os produtos vinculados a ela!",
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

  onEditCategoria(item: any) {
    this.categoria = item
    this.edicaoCategoria = true
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

  onPostCategoria(){
    if (this.categoria.nome == ""){
      this.alertaPequeno = "Preencha todos os campos!"
      this.changeAlertaPequeno()
    } else {
      if (this.categoria._id == undefined){
        this.http.post(`${this.dataService.linkApi}/default/model_Categorias`, this.categoria).subscribe((res: any) => {
          try {
            this.onCancelar()
            this.alertaPequeno = "Categoria salva com sucesso!"
            this.changeAlertaPequeno()
          } catch (error) {
            console.log(error)
          }
        })
      } else {
        this.http.put(`${this.dataService.linkApi}/default/model_Categorias/${this.categoria._id}`, this.categoria).subscribe((res: any) => {
          try {
            this.onCancelar()
            this.alertaPequeno = "Categoria salva com sucesso!"
            this.changeAlertaPequeno()
          } catch (error) {
            console.log(error)
          }
        })
      }
    }
  }

  onDeleteCategoria(){
    this.http.delete(`${this.dataService.linkApi}/produtos/${this.categoria._id}`).subscribe((res: any) => {
      try {
        this.http.delete(`${this.dataService.linkApi}/default/model_Categorias/${this.categoria._id}`).subscribe((res: any) => {
          try {
            this.onCancelar()
            this.alertaPequeno = "Registros excluídos com sucesso!"
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
    this.categoria = {
      id_conta: this.conta._id,
      nome: "",
    }
    this.onGetCategorias()
    this.edicaoCategoria = false
  }

}