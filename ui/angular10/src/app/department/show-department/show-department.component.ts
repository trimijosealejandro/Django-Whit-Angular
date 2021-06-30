import { Component, OnInit } from '@angular/core';
import {SharedService}from '../../shared.service';


@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit {

  DepartmentList:any=[];
  ModalTitle:string="";
  ActivateAddEditDepComp:boolean=false;
  dep:any;

  constructor(private _service:SharedService) { }

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick(){
    this.ModalTitle="Añadir Departamento";
    this.ActivateAddEditDepComp=true;
    this.dep={
        DepartmentId:0,
        DepartmentName:""
    }
  }
  editClick(item:any){
    this.dep=item;
    this.ModalTitle="Editar Departamento";
    this.ActivateAddEditDepComp= true;
  }
  deleteClick(item:any){
    if(confirm('Estas seguro?')){
      this._service.deleteDepartment(item.DepartmentId).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }
  closeClick(){
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();

  }
  refreshDepList(){
    this._service.getDepList().subscribe(data=>{
      this.DepartmentList = data;
    });
  }

}
