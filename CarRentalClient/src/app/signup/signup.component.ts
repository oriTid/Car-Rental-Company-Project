import { Component, OnInit } from '@angular/core';
import { UsersModel } from '../shared/models/Users.model';
import { UserModel } from '../shared/models/User.model';
import { UserService } from '../shared/services/User.service';
import { UploadImageService } from '../shared/services/UploadImage.service';
import { environment } from "../../environments/environment";
import { Guid } from '../../app/shared/models/Guid.model';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  localUsersManager: UsersModel;
  localenv: string = environment.endPoint; //enviroument
  actionMsg: string;
  showAllUsers: boolean;
  uid: number; //parameter to filter
  userSignForm: any; //for the form control
  imageUrl: string = ""; //car pic url
  fileToUpload: File = null; //car pic up load file
  toDelete: boolean;

  localUser: UserModel =
    {
      UserID: undefined,
      FirstName: undefined,
      LastName: undefined,
      ID: undefined,
      UserName: undefined,
      Birthdate: undefined,
      isMale: false,
      Email: undefined,
      Password: undefined,
      UserPic: undefined,
      UserPermission: 0,
      IsDeleted: false
    };

  constructor(
    private myUsersService: UserService,
    private myImageService: UploadImageService,
    private myActiveRoute: ActivatedRoute,
    private myRoute: Router,
    private myDialog: DialogService) {
    this.buildUserForm(); //call method to build the userform valdationes
  }

  //////////// File upload functions /////////
  handleFileInput(file: FileList) {
    //Save image to the class property
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => { this.imageUrl = event.target.result; }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnPicSubmit() {
    this.myImageService.postFile(this.localUser.UserPic, this.fileToUpload)
      .subscribe(data => {
        console.log('done');
        let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Action Done" : "Action Failed"; }
        this.myUsersService.insertUser(this.localUser).subscribe(callback);
        this.myUsersService.getAllUsers()
          .subscribe(
            users => this.myUsersService.userInfo.usersList = users
          );
        if (this.localUser.UserID > 0) {
          this.myDialog.dialog('edit user', `user ${this.localUser.UserName} updated successfully`);
        } else this.myDialog.dialog('Signup', `Thank you for signing up with us ${this.localUser.UserName}`);
        if (this.myUsersService.isAuth) {
          this.myRoute.navigate(['/Users']);
        } else {
          this.myRoute.navigate(['/signin']);
        }
      });
  }

  saveChanges() {
  
   if(! this.bDayCheck())  //check the Birthdate;
      return;

    if (this.userSignForm.invalid) { //check other form fields validation
      this.myDialog.dialog('Signup', `Please review and fill all the from fields`);
      return;
    }
    if (this.fileToUpload && this.fileToUpload.name) {
      let newFileName: string = Guid.newGuid().toString() + this.fileToUpload.name; //generate guid for the pic filename  
      this.localUser.UserPic = newFileName;
      this.OnPicSubmit();
      return;
    }
    let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Action Done" : "Action Failed"; }
    this.myUsersService.insertUser(this.localUser).subscribe(callback);
    if (this.localUser.UserID > 0) {
      this.myDialog.dialog('edit user', `user ${this.localUser.UserName} updated successfully`);
    } else this.myDialog.dialog('Signup', `Thank you for signing up with us ${this.localUser.UserName}`);
    
    if (this.myUsersService.isAuth) {
      this.myRoute.navigate(['/Users']);
    } else {
      this.myRoute.navigate(['/Home']);
    }
  };

  removeTimeFromDate(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  } 

  bDayCheck(): boolean {
    let today: any = new Date(Date.now());
    let userbday: any = new Date(this.localUser.Birthdate);
    let yearsOld: number;
    if (this.removeTimeFromDate(today) < this.removeTimeFromDate(userbday)) {
      this.myDialog.dialog('Signup', `Cant be from the Future nope ? Check your birthdate.`);
      return false;
    }
    yearsOld = (today.getUTCFullYear() - userbday.getUTCFullYear());
    if (yearsOld < 16) {
      this.myDialog.dialog('Signup', `You must be 16 Years to signup`);
      return false;
    }

    return true;
  }

  //Builds form to apply validations
  buildUserForm() {
    this.userSignForm = new FormGroup({
      FirstName: new FormControl(this.localUser.FirstName, Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])
      ),
      LastName: new FormControl(this.localUser.LastName, Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])
      ),
      UserName: new FormControl(this.localUser.UserName, Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])
      ),
      Password: new FormControl(this.localUser.Password, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ])
      ),
      ID: new FormControl(this.localUser.ID, Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]$"),
        Validators.maxLength(9)])

      ),
      Birthdate: new FormControl(this.localUser.Birthdate, Validators.compose([
      ])
      ),
      isMale: new FormControl(this.localUser.isMale, Validators.compose([
        Validators.required])
      ),
      Email: new FormControl(this.localUser.Email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
      )
    });
  }

  ngOnInit() {
    this.localUsersManager = this.myUsersService.userInfo;
    const uid = this.myActiveRoute.snapshot.params['uid']
    if (uid == undefined)
    return;

    if (uid) {
      this.myUsersService.getSpecificUser(uid)
        .subscribe(
          userList => {
            this.localUser = userList[0];
          }
        )
    }
  };
}
