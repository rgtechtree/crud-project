import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Router, ActivatedRoute, Event } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  apiPath = "http://localhost:3000/users/";
  getproductData;
  userId;
  mode = 'Create';
  buttontext = 'Create';

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.createForm();
    this.getIdByURL();
  }
  // get ID
  getIdByURL() {
    this.route.paramMap.subscribe(
      (param) => {
        console.log(param)
        const id = param.get('id');
        this.userId = id;
        if (id) {
          console.log(id)
          this.getUserById(id);
          this.mode = 'Edit';
          this.buttontext = 'Update'
        }
      }
    );
  }

  // User Form
  createForm() {
    this.userForm = this.fb.group({
      userName: [null, [Validators.required]],
      email: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
      lat: [null, Validators.required],
      long: [null, Validators.required],
    })
  }

  // Add and Update User
  addUser(form: NgForm) {
   
    if (this.userId) {
      const requestBody = [
        {
          "userCategory": "name",
          "value": this.userForm.get('userName').value
        },
        {
          "userCategory": "email",
          "value": this.userForm.get('email').value
        },
        {
          "userCategory": "phoneNumber",
          "value": this.userForm.get('phoneNumber').value
        },
        {
          "userCategory": "address",
          "value": this.userForm.get('address').value
        },
        {
          "userCategory": "lat",
          "value": this.userForm.get('lat').value
        },  
        {
          "userCategory": "long",
          "value": this.userForm.get('long').value
        }
      ]
      this.http.patch(this.apiPath + this.userId, requestBody).subscribe(
        (res) => {
          console.log(res);
          this.userForm.reset();
          this.router.navigate(['/userlist']);
        },
        (err) => {
          console.log(err);
        }
      )
    }
    else {
      const createBody = {

        'name': this.userForm.get('userName').value,
        'email': this.userForm.get('email').value,
        'phoneNumber': this.userForm.get('phoneNumber').value,
        'address': this.userForm.get('address').value,
        'lat': this.userForm.get('lat').value,
        'long': this.userForm.get('long').value,

      }
      this.http.post(this.apiPath, createBody).subscribe(
        (res) => {
          console.log(res);
          this.userForm.reset();
          this.router.navigate(['/userlist'])
        }
      )
      console.log(form.value)
    }
  }
  // get one User info
  getUserById(id) {
    this.http.get(this.apiPath + id).subscribe(
      (res) => {
        console.log(res);
        this.editUserData(res)
      }
    )
  }

  // patch current User value to form
  editUserData(productData) {
    this.userForm.patchValue({
      userName: productData.name,
      email: productData.email,
      phoneNumber: productData.phoneNumber,
      address: productData.address,
      lat: productData.lat,
      long: productData.long,
    })
  }

}
