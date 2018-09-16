import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../components/dialog/dialog.component';



@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private mDialog: MatDialog
  ) { }

  dialog(title: string, message: string): void {
    let dialogRef: MatDialogRef<DialogComponent>

    dialogRef = this.mDialog.open(DialogComponent, {
      width: '610px',
      height: '280px',
    });

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

  }  

  closeAll() {
    this.mDialog.closeAll();
  }
}
