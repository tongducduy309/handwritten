import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  code =''

  constructor(private crud:CrudService, private router:Router, private user:UserService) {

  }
  ngOnInit(): void {
    let c = localStorage.getItem("hadwritten-invite")

    if (c!=null)
    {
      this.code = c
      this.confirm()
    }
  }

  async confirm(){
    try{
      (await (this.crud.getDataByDID("admin",this.code))).subscribe((data)=>{
        let d = data.data()
        if (d){
          localStorage.setItem("hadwritten-invite",this.code)
          this.user.setCode(this.code)
          this.router.navigate([''])

        }
      })
    }
    catch (e){
      console.log(e);
    }
  }
}
