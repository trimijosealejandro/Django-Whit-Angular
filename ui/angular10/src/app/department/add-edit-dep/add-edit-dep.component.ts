import { Component, OnInit, Input} from '@angular/core';
import{SharedService}from '../../shared.service';


@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  @Input() dep:any;
  DepartmentId:string='';
  DepartmentName:string='';
  constructor( private _service:SharedService) { }

  ngOnInit(): void {
    this.DepartmentId=this.dep.DepartmentId;
    this.DepartmentName=this.dep.DepartmentName;
  }
  addDepartament(){
    var val = {
      DepartmentId:this.DepartmentId,
      DepartmentName:this.DepartmentName
    };
    this._service.addDepartment(val).subscribe(res=>{
     alert(res.toString());
    });

  }
  updateDepartament(){
    var val = {
      DepartmentId:this.DepartmentId,
      DepartmentName:this.DepartmentName
    };
    this._service.updateDepartment(val).subscribe(res=>{
      alert(res.toString());
    });

  }
}
