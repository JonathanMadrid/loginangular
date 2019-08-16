import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  respuesta:any;
 

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {

    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = false;
    }

  }


  login( form: NgForm ) {

    if (  form.invalid ) { return; }
    

      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Loading...'
      });
      Swal.showLoading();
   


    this.auth.login( this.usuario )
      .subscribe( resp => {

        console.log(resp);
        Swal.close();
        this.respuesta = resp;
        
        
        if ( this.recordarme ) {
          localStorage.setItem('object', JSON.stringify(resp));
        }


        this.router.navigateByUrl('/home');
        console.log('llegando');
      }, (err) => {

        console.log(err.error.error.message);
     
          Swal.fire({
            type: 'error',
            title: 'Error al autenticar',
            text: err.error.error.message
          });
     
      });

  }


}
