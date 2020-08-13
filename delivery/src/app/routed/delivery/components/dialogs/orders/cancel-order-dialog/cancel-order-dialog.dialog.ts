import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './cancel-order-dialog.dialog.html',
  styleUrls: ['./cancel-order-dialog.dialog.sass']
})
export class CancelOrderDialogDialog implements OnInit {
  constructor(private readonly dialogRef: MatDialogRef<CancelOrderDialogDialog, boolean>) {}

  ngOnInit(): void {}

  trueResult(): void {
    this.dialogRef.close(true);
  }

  falseResult(): void {
    this.dialogRef.close(false);
  }
}
