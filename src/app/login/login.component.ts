import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http : HttpClient ,  private router: Router) { 
  
}
dataResult : any = false;
username: String = '';
password: String = '';

  
login(){
  let loginData = {
    "username" : this.username,
    "password" : this.password}
this.http.post("http://localhost:8088/borkizi/login",loginData,{responseType: 'text'}).subscribe((dataResult: any) => {
console.log(dataResult);
alert(dataResult);
  
if (dataResult === "Login successful") {
  // Redirect to MainComponent after successful login
  this.router.navigate(['/main']);
}

})

}

}
