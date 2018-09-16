import { Component, OnInit } from '@angular/core';
import { BranchesModel } from '../shared/models/Branches.model';
import { BranchModel } from '../shared/models/Branch.model';
import { BranchService } from '../shared/services/Branch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-branch-info',
  templateUrl: './branch-info.component.html',
  styleUrls: ['./branch-info.component.css']
})
export class BranchInfoComponent implements OnInit {


  localBranchesManager: BranchesModel;
  actionMsg: string;
  showAllBranches: boolean;
  bid: number; //parameter to filter Branches List
  localParam: string; //for the routing
  toDelete: boolean;
  localBranch: BranchModel =
    {
      BranchID: undefined,
      BranchName: undefined,
      BranchTel: undefined,
      BranchAddress: undefined,
      BranchLatitude: undefined,
      BarnchLongitude: undefined,
      IsDeleted: undefined
    };

  constructor(
    private myBranchesService: BranchService,
    private myActiveRoute: ActivatedRoute,
    private myDialog: DialogService,
    private myRoute: Router) { }


  saveChanges() {

    let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Action Done" : "Action Falied"; }
    (this.localParam != undefined) ? this.myBranchesService.editBranch(this.localBranch).subscribe(callback) : this.myBranchesService.insertBranch(this.localBranch).subscribe(callback);
    if (this.localBranch.BranchID > 0) {
      this.myDialog.dialog('Edit Branch', `${this.localBranch.BranchName} branch updated successfully`);
    }
    else this.myDialog.dialog('New Branch', `${this.localBranch.BranchName} branch added successfully`);
    this.myBranchesService.getAllBranches()
      .subscribe(
        branches => this.myBranchesService.branchInfo.branchesList = branches
      );
    this.myRoute.navigate(['/Branches']);
  }

  markBranchforDelete(param: boolean) {
    if (param = true) {
      if (confirm("Are you sure you want to delete this Branch ?")) {
        this.localBranch.IsDeleted = true;
        let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Delete Done" : "Delete Failed"; }
        this.myBranchesService.editBranch(this.localBranch).subscribe(callback);
        if (callback) {
          this.myBranchesService.getAllBranches()
            .subscribe(
              branches => this.localBranchesManager.branchesList = branches
            );
          this.myDialog.dialog('Branch', `Branch deleted`);
          this.myRoute.navigate(['/Branches']);
        }
      }
      else;
    }
  }

  ngOnInit() {

    this.localBranchesManager = this.myBranchesService.branchInfo;

    this.myActiveRoute.params.subscribe(params => {
      this.localParam = params.bid;
      if (params.bid) {
        this.myBranchesService.getSpecificBranch(params.bid)
          .subscribe(branchList => { this.localBranch = branchList[0]; })
      }
    });
  }
}