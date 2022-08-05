import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast:any;
declare var $:any;


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public cliente : any = {};
  public id:any;
  public token;

  constructor(
    private _clienteService:ClienteService
  ) {
    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');


    if(this.id){
      //trae toda la info del usuario
      this._clienteService.obtener_cliente_guest(this.id,this.token).subscribe(
        response => {
          //console.log(response);
          this.cliente = response.data;
        }
      )
    }
   }

  ngOnInit(): void {
  }

  //actualizar data de un perfil
  actualizar(actualizarForm:any){
    if(actualizarForm.valid){
      //console.log(this.cliente);
      //para que el password no aparezca de una
      this.cliente.password = $('#input_password').val();
      this._clienteService.actualizar_perfil_cliente_guest(this.id,this.cliente,this.token).subscribe(
        response =>{
          //console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#FF0000',
            color: '#1DC74C',
            class:'text-success',
            position: 'topRight',
            message: 'se actualizo correctamente.'
          });
        }
      )
    }else{
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topLeft',
        message: 'datos no validos'
      });
    }
  }

}
