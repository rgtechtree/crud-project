import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  apiPath = "http://localhost:3000/users/";
  userData;
  singleUserData;
  // lat: number = 12.971599;
  // lng: number = 77.594566;
  showmap = false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getAllUser();
  }

  // get User Data
  getAllUser() {
    this.http.get(this.apiPath).subscribe(
      (res) => {
        console.log(res);
        this.userData = res;
        console.log(this.userData.products)
      }
    );
  }

  // Edit User
  onEditUser(id) {
    this.router.navigate(['/createuser/edit', id])
  }
  // Delete User
  delete(id) {
    if(confirm("Are you sure to want delete this user")){
      this.http.delete(this.apiPath + id).subscribe(
        (res) => {
          console.log(res);
          this.getAllUser();
        }
      );
    }
    
  }
 
  view(id) {
    this.singleUserData = this.userData.products[id];
    this.showmap = true;
    // this.lat = 20;
    // this.lng = 80;
  }

  convertintonumber(num){
    return Number(num)
  }
}
