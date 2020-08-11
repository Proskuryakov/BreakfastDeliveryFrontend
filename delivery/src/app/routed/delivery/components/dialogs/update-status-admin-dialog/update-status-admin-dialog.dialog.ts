import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogModelUpdateOrderStatus, StatusesOfOrder } from '../../../../../features/orders/models/order.model';

interface FormValue {
  status: StatusesOfOrder;
}

@Component({
  templateUrl: './update-status-admin-dialog.dialog.html',
  styleUrls: ['./update-status-admin-dialog.dialog.sass']
})
export class UpdateStatusAdminDialogDialog implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModelUpdateOrderStatus,
    @Inject(MAT_DIALOG_DATA) private readonly input: UpdateStatusAdminDialogDialog,
    private readonly http: HttpClient,
    private ref: ChangeDetectorRef
  ) {}

  statuses = Object.keys(StatusesOfOrder) as StatusesOfOrder[];
  status: StatusesOfOrder | undefined;
  idOrder: number = this.data.id;

  currentStatus: string = this.data.status;
  nextStage: string | undefined;
  click = false;

  ngOnInit(): void {
    this.nextLevel();
  }

  changeStatusAuto(newStatus: StatusesOfOrder): void {
    if (this.idOrder != undefined && newStatus != undefined) {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      const url = 'http://127.0.0.1:8080/api/orders/' + this.idOrder;
      this.http
        .put(url, { status: newStatus }, httpOptions)
        // tslint:disable-next-line:no-console
        .subscribe((res) => console.info(res));
    }
    const ind = this.statuses.indexOf(newStatus as StatusesOfOrder);
    this.currentStatus = this.statuses[ind];
    if (ind < this.statuses.length - 2) {
      this.click = false;
      this.nextStage = this.statuses[ind + 1];
    } else {
      this.click = true;
      this.nextStage = this.statuses[ind];
    }
  }

  handleSaveCLick(value: FormValue): void {
    this.changeStatusAuto(value.status);
    this.nextLevel();
  }

  nextLevelBtn(): void {
    const ind = this.statuses.indexOf(this.currentStatus as StatusesOfOrder);
    // console.info(ind + ' currStat- совпадать с 1');
    if (ind < this.statuses.length - 2) {
      const newInd = ind + 1;
      this.changeStatusAuto(this.statuses[newInd]);
    } else {
      this.changeStatusAuto(this.statuses[ind]);
    }
    this.nextLevel();
  }

  nextLevel(): void {
    const ind = this.statuses.indexOf(this.currentStatus as StatusesOfOrder);
    // tslint:disable-next-line:no-console
    console.info('ind ' + ind);

    if (ind < this.statuses.length - 2) {
      const newInd = ind + 1;
      this.click = false;
      this.nextStage = this.statuses[newInd];
    } else {
      this.click = true;
      this.nextStage = this.statuses[ind];
    }
    this.ref.detectChanges();
  }
}
