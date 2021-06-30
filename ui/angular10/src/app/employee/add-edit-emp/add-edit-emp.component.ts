import { Component, OnInit, Input } from '@angular/core';
import{SharedService}from '../../shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  @Input() emp:any;
  EmployeeId:string="";
  EmployeeName:string="";
  Department:string="";
  DateOfJoining:string="";
  photoFileName:string="";
  photoFilePath:string="";

  DepartmentList:any=[];

  constructor( private _service:SharedService) { }

  ngOnInit(): void {
    this.loadDepartmentList();
  }
  loadDepartmentList(){
    this._service.getAllDepartmentName().subscribe((data:any)=>{
      this.DepartmentList=data;

      this.EmployeeId=this.emp.EmployeeId;
      this.EmployeeName=this.emp.EmployeeName;
      this.Department=this.emp.Department;
      this.DateOfJoining=this.emp.DateOfJoining;
      this.photoFileName=this.emp.photoFileName;
      this.photoFilePath=this._service.PhotoUrl+this.photoFileName;
    });
  }
  addEmployee(){
    var val = {
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      photoFileName:this.photoFileName,
    };
    this._service.addEmployee(val).subscribe(res=>{
     alert(res.toString());
    });

  }
  updateEmployee(){
    var val = {
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      photoFileName:this.photoFileName,
    };
    this._service.updateEmployee(val).subscribe(res=>{
     alert(res.toString());
    });
}
  uploadPhoto(event:any){
    var file=event.target.file[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this._service.UploadPhoto(formData).subscribe((data:any)=>{
      this.photoFileName=data.toString();
      this.photoFilePath=this._service.PhotoUrl+this.photoFileName;
    })
  }
}
