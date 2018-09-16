import { Component, OnInit } from '@angular/core';
import { BranchesModel } from '../shared/models/Branches.model';
import { BranchService } from '../shared/services/Branch.service';
import { UsersModel } from '../shared/models/Users.model';
import { UserService } from '../shared/services/User.service';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  actionMsg: string;
  localBranchesManager: BranchesModel;
  bid: number; //parameter to filter branches list
  localUser: UsersModel; //for allowing buttons and operation by permissions

  constructor(
    private myBranchesService: BranchService,
    private myUserService: UserService,
    private myDialog: DialogService) {
    this.localUser = this.myUserService.userInfo;
  }

  deleteBranch(bid: number) {
    if (confirm("Are you sure you want to delete this Branch ?")) {
      this.myBranchesService.deleteBranch(this.localBranchesManager.branchesList.find(b => b.BranchID == bid)).subscribe(
        (res) => {
          if (res) {
            this.myDialog.dialog('Branches', `Branch deleted`);
            this.myBranchesService.getAllBranches()
              .subscribe(
                branches => this.localBranchesManager.branchesList = branches
              );
          }
        });
    }
    else;
  }

  ngOnInit() {

    this.myBranchesService.getAllBranches()
      .subscribe(
        branches => this.myBranchesService.branchInfo.branchesList = branches
      );

    this.localBranchesManager = this.myBranchesService.branchInfo;//why page is not reloading after editing branch ??

  }

}
