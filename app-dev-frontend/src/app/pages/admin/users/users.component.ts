import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {User} from "../../../model/User";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ConfirmationPanelComponent} from "../../../components/confirmation-panel/confirmation-panel.component";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  displayedColumns = ['name', 'username', 'email', 'phone', 'role', 'action'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: AuthService,
              private dialog: MatDialog, private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn)
    {
      this.router.navigate(['/login']);
    }
    this.refresh();
  }

  refresh()
  {
    this.userService.getUsers().subscribe( res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
}
