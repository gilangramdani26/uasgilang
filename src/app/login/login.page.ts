// tab5.page.ts
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  username: string;
  password: string;
  private apiUrl = 'https://praktikum-cpanel-unbin.com/gilang/';
  showErrorMessage: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const data = {
      username: this.username,
      password: this.password
     
    };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  
    // Kirim permintaan HTTP langsung ke API PHP dengan data login
    this.http.post(`${this.apiUrl}login.php`, data, httpOptions).subscribe(response => {
      // Handle response dari server di sini
      console.log(response);
      this.showErrorMessage = true;
  
      // Jika login berhasil, navigasikan ke tab1
      if (response['status'] === 'success') {
        this.router.navigate(['/tabs']);
      }
    });
  }
}