import { Component, OnInit } from '@angular/core';
import {SharedService}from '../../shared.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  EmployeeList:any=[];
  ModalTitle:string="";
  ActivateAddEditEmpComp:boolean=false;
  emp:any;
  constructor(private _service:SharedService) { }

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.ModalTitle="Añadir Empleado";
    this.ActivateAddEditEmpComp=true;
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
  }

  editClick(item:any){
    this.emp=item;
    this.ModalTitle="Editar Empleado";
    this.ActivateAddEditEmpComp= true;
  }

  deleteClick(item:any){
    if(confirm('Estas seguro?')){
      this._service.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }
  closeClick(){
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();

  }
  refreshEmpList(){
    this._service.getEmpList().subscribe(data=>{
      this.EmployeeList = data;
    });
  }

}
