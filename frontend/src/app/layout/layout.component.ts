import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.verficarLoginLayout()
  }

  route: string       = this.router.url
  menuAberto: boolean = false

  changeMenu(){
    if (this.menuAberto == false){
      this.menuAberto = true
    } else {
      this.menuAberto = false
    }
  }

}
