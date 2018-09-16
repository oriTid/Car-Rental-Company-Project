import { Component, OnInit} from '@angular/core';
import { UserService } from '../shared/services/User.service';
import { UsersModel } from '../shared/models/Users.model';
import { StorageService } from '../shared/services/storage.service';
import { Router } from '../../../node_modules/@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  localenv: string = environment.endPoint; //enviroument
  localUser: UsersModel;
  isAuth = this.myUserService.isAuth;


  constructor(
    private myUserService: UserService,
    private myLocalStorage: StorageService,
    private myRoute: Router
  ) {

    this.localUser = this.myUserService.userInfo;
    this.isAuth = myUserService.isAuth;

  }
  signOut(): void {
    this.myLocalStorage.clearAllData();
    this.localUser.singleUser = null;
    this.myUserService.userInfo.singleUser = null;
    this.myUserService.isAuth = false;
    this.myRoute.navigate(['/Home']);
  }

  ngOnInit() {
    this.isAuth = this.myUserService.isAuth;
    const user = this.myLocalStorage.getData('user');
    if (user) {
      this.localUser.singleUser = user;
    }
  }
}


