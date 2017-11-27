import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Report} from "../../../model/Report";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ReportService} from "../../../services/reports.service";
import {ViewAdComponent} from "../view-ad/view-ad.component";
import {Ad} from "../../../model/Ad";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../model/User";
import {ConfirmationPanelComponent} from "../../../components/confirmation-panel/confirmation-panel.component";
import {FlashMessagesService} from "angular2-flash-messages";
import {MessagesService} from "../../../services/messages.service";
import {Message} from "../../../model/Message";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit {
  displayedColumns = ['name', 'username', 'reported_by', 'reason', 'action'];
  dataSource: MatTableDataSource<Report> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: AuthService, private reportService: ReportService,
              private dialog: MatDialog, private router: Router,
              private _flashMessagesService: FlashMessagesService, private messageService: MessagesService) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn)
    {
      this.router.navigate(['/login']);
    }
    this.refresh();
  }

  refresh()
  {
    this.reportService.getReports().subscribe( res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewAd(ad: Ad): void {
    let viewAdDialogRef = this.dialog.open(ViewAdComponent, {
      data: ad
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteUser(user: User)
  {
    let confPanelRef = this.dialog.open(ConfirmationPanelComponent, {
      data: "Are you sure you want to delete this user: " + user.username + " (" + user.fullName + ")"
    })

    confPanelRef.afterClosed().subscribe( res => {
      if (res)
      {
        this.userService.delete(user).subscribe( res =>{
          this._flashMessagesService.show('Deleted successfully', { timeout: 2000, cssClass: 'success' });
          this.refresh();
        });
      }
    });
  }

  sendWarning(report: Report)
  {
    var text = "You have been reported. Reason: " + report.reason + ". Please behave yourself or your account will be deleted!";

    this.messageService.newMessage(new Message(report.user, this.userService.user, text)).subscribe( res =>{
      this._flashMessagesService.show('Warning sent successfully', { timeout: 2000, cssClass: 'success' });
    });
  }
}
