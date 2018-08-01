import { Component, OnInit } from '@angular/core';
import { userData } from "./login-interface.component";
import { LoginService } from "./login.service";
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Sha256 } from '../services/library/hash/sha256';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ LoginService, Sha256 ]
})

export class LoginComponent implements OnInit{
    userData: userData = {
        userId: '',
        userPassword: ''
    };
    public loginform: FormGroup;
    public submitted: boolean = false;

    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private sha256: Sha256) { }

    ngOnInit() {
        this.loginform = this.formBuilder.group({
            'user_id': new FormControl(null, Validators.required),
            'user_password': new FormControl(null, Validators.required)
        });
    }

    onSubmit(value: any) {
        this.submitted = true;

        this.userData.userId = value.user_id;
        this.userData.userPassword = this.sha256.get(value.user_password);

        this.loginService.login(this.userData.userId, this.userData.userPassword);
    }
}


