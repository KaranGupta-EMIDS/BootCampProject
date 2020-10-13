import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PAGE_SIZE_OPTIONS } from '../../../constants/appConstants';
import { UserData } from '../../../interfaces/user-data';
import { MockService } from '../../../services/mock.service';
import { throwError } from 'rxjs';
import {
  getUserListFromStorage,
  setUsetListInStorage,
} from '../../../utilities/helper';

@Component({
  selector: 'app-contact-list',
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.css'],
})
export class ContactListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<UserData>;
  public pageSizeOptions = PAGE_SIZE_OPTIONS;
  public filterKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private mockService: MockService
  ) {
    const self = this;
    this.displayedColumns = [
      'id',
      'profilePic',
      'name',
      'compositeField',
      'dateOfBirth',
      'location',
      'addAsFriend',
    ];
  }

  ngOnInit() {
    if (!localStorage.getItem('userlist')) {
      this.getUserList();
    } else {
      this.dataSource = new MatTableDataSource(getUserListFromStorage());
    }
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    if (this.filterKey) {
      this.dataSource.filter = this.filterKey.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  private getUserList() {
    this.mockService.getUserList().subscribe(
      (userList: Array<UserData>) => {
        if (Array.isArray(userList) && userList.length > 0) {
          this.dataSource = new MatTableDataSource(userList);
          setUsetListInStorage(userList);
        } else {
          throwError(new Error('Oops'));
        }
      },
      (err) => {
        this._snackBar.open('Failed to retrieve data from server.', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  public clearSearchFilter() {
    this.dataSource.filter = this.filterKey = null;
  }

  public addAsFriend(userData: UserData, index: number) {
    let message: string;
    let userList: Array<UserData> = getUserListFromStorage();
    if (Array.isArray(userList) && userList.length > 0) {
      if (!userData.isFriend) {
        if (typeof index === 'number') {
          userList[index].isFriend = !userList[index].isFriend;
          userData.isFriend = !userData.isFriend;
          setUsetListInStorage(userList);
          message = 'Contact added successfully to your friend’s list.';
        } else {
          message = 'Cannot find user data in  friend’s list.';
        }
      }
    } else {
      message =
        'Failed to add the contact to your friend’s list due to the server/transaction error. Please try again later. ';
    }
    if (message) {
      this._snackBar.open(message, 'OK', { duration: 3000 });
    }
  }
}
