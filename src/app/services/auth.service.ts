import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/login/validateUser';
 

  userEmail: string;



  constructor( private http: HttpClient ) {
    this.leerEmail();
  }


  logout() {
    localStorage.removeItem('email');
  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureEmail: true
    };

    return this.http.post(
      `${ this.url }`,
      authData
    ).pipe(
      map( resp => {
        console.log('entro');
        console.log(resp);
        this.guardarEmail( resp );
        return resp;
      })
    );

  }



  private guardarEmail( info:any ) {
    console.log(info);
    this.userEmail = info.email;
    localStorage.setItem('object', JSON.stringify(info));
  }

  leerEmail() {

    if ( localStorage.getItem('email') ) {
      this.userEmail = localStorage.getItem('email');
    } else {
      this.userEmail = null;
    }

    return this.userEmail;

  }


  estaAutenticado(): boolean {

    if ( this.userEmail != null) {
      return true;
    } else {
      return false;
    }


  }


}
