import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {User} from "../../../model/User";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {AuthService} from "../../../services/auth.service";
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

  constructor(private userService: AuthService, private detectorRef: ChangeDetectorRef, private dialog: MatDialog) {}

  ngOnInit()
  {
    this.refresh();
  }

  refresh()
  {
    this.userService.getUsers().subscribe( res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.detectorRef.detectChanges();
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
}
