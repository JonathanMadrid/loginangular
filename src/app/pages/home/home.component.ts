import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


import { UsuarioModel } from '../../models/usuario.model';
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  respuesta: any;

  constructor( private auth: AuthService,
               private router: Router ) { 
                 
               }

  ngOnInit() {
    if (localStorage.getItem("object")) { 
      this.respuesta = JSON.parse(localStorage.getItem("object"));
    }
  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }




}
