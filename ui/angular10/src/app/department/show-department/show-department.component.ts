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

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:any=[];

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
      this.DepartmentListWithoutFilter=data;
    });
  }

  FilterFn(){
    var DepartmentIdFilter=this.DepartmentIdFilter;
    var DepartmentNameFilter=this.DepartmentNameFilter;

    this.DepartmentList=this.DepartmentListWithoutFilter.filter(function (el:any){
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }
  sortResult(prop:string,asc:boolean){
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop])?-1:0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop])?-1:0);
      }
    });
  }
}
