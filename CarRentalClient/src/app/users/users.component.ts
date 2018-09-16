import { Component, OnInit } from '@angular/core';
import { UsersModel } from '../shared/models/Users.model';
import { UserService } from '../shared/services/User.service';
import { environment } from '../../environments/environment';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  actionMsg: string;
  localUsersManager: UsersModel;
  uid: number; //parameter to filter branches list
  localenv: string = environment.endPoint; //enviroument

  constructor(
    private myUsersService: UserService,
    private myDialog: DialogService) { }

  deleteUser(uid: number) {
    if (confirm("Are you sure you want to delete this User ?")) {
      this.myUsersService.deleteUser(this.localUsersManager.usersList.find(b => b.UserID == uid)).subscribe(
        (res) => {
          if (res) {
            this.myDialog.dialog('Users', `User deleted`);
            this.myUsersService.getAllUsers()
              .subscribe(
                users => this.localUsersManager.usersList = users
              );
          }
        });
    }
    else;
  }
  ngOnInit() {

    this.myUsersService.getAllUsers()
      .subscribe(
        users => this.myUsersService.userInfo.usersList = users
      );

    this.localUsersManager = this.myUsersService.userInfo;
  }
}
