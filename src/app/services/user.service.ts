import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  code:any = null
  constructor(private router:Router) { }

  getCode(){
    return this.code
  }

  setCode(value:any){
    this.code=value
  }

  isUser(){
    if (this.code==null)
    {
      let c = localStorage.getItem("hadwritten-invite")
      if (c==null)
        this.router.navigate(['login'])
    }

  }
}
