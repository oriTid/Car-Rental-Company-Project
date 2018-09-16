import { Component, OnInit } from '@angular/core';
import { UsersModel } from '../shared/models/Users.model';
import { UserService } from '../shared/services/User.service';
import { UserModel } from '../shared/models/User.model';
import { environment } from '../../environments/environment';
import { StorageService } from '../shared/services/storage.service';
import { Router } from '../../../node_modules/@angular/router';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  actionMsg: string; //for messages
  localenv: string = environment.endPoint; //enviroument
  localUsersManager: UsersModel;
  localUser: UserModel =
    {
      UserID: null,
      FirstName: '',
      LastName: '',
      ID: '',
      UserName: '',
      Birthdate: null,
      isMale: false,
      Email: '',
      Password: '',
      UserPic: '',
      UserPermission: null,
      IsDeleted: false
    };

  constructor(
    private myUsersService: UserService,
    private myLocalStorage: StorageService,
    private myRoute: Router,
    private myDialog: DialogService
  ) { }

  getUser(username: string, password: string): void {
    let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Bad username or password." : ""; }
    this.myUsersService.getUserForLogin(username, password)
      .subscribe(
        user => {
          this.localUser = user;
          this.myLocalStorage.saveData('user', user);
          this.myUsersService.isAuth = true;
          this.myDialog.dialog('Login', `Welcome back ${this.localUser.UserName} !!`);
          // this.modal.signInDialog('Login', `Welcome back ${this.localUser.UserName} !!`);
          this.myRoute.navigate(['/Cars']);
        } ,       
        callback)
  }

  ngOnInit() {
    const user = this.myLocalStorage.getData('user');
    if (user) {
      this.localUser = user;
      this.myUsersService.userInfo.singleUser = user;
      this.myUsersService.isAuth = true;      
    }
  }

}
