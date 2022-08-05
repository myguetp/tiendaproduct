import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from '../services/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _clienteService:ClienteService,
    private _router:Router
  ){

  }

  //permiso de entrada
  canActivate():any{
    //identificamos el rol que tiene permiso de entrada
    if(!this._clienteService.isAuthenticated()){
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }


}
