import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  COMPOSITE_FIELD,
  DATE_OF_BIRTH,
  LOCATION,
  NAMES,
  PAGE_SIZE_OPTIONS,
  PROFILE_PIC,
} from '../../../constants/appConstants';
import { UserData } from '../../../interfaces/user-data';

@Component({
  selector: 'app-contact-list',
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.css'],
})
export class ContactListComponent implements  AfterViewInit {
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<UserData>;
  public pageSizeOptions = PAGE_SIZE_OPTIONS;
  public filterKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    const self = this;
    this.displayedColumns = [
      'id',
      'profilePic',
      'name',
      'compositeField',
      'dateOfBirth',
      'location',
    ];
    const users = Array.from({ length: 50 }, (_, k) =>
      self.createNewUser(k + 1)
    );

    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    if (this.filterKey) {
      this.dataSource.filter = this.filterKey.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  private createNewUser(id: number): UserData {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

    return {
      id: id.toString(),
      name: name,
      compositeField:
        COMPOSITE_FIELD[Math.round(Math.random() * (PROFILE_PIC.length - 1))],
      dateOfBirth:
        DATE_OF_BIRTH[Math.round(Math.random() * (PROFILE_PIC.length - 1))],
      profilePic:
        PROFILE_PIC[Math.round(Math.random() * (PROFILE_PIC.length - 1))],
      location: LOCATION[Math.round(Math.random() * (PROFILE_PIC.length - 1))],
    };
  }

  public clearSearchFilter() {
    this.dataSource.filter = this.filterKey = null;
  }
}
