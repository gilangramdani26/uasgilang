import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  searchTerm: string = '';
  filteredData: any[] = [];
  originalData: any[] = [];
  private searchSubject: Subject<string> = new Subject<string>();

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.fetchData();  // Refresh data when pulling down
      event.target.complete();
    }, 2000);
  }

  constructor(private http: HttpClient) {
    // Subscribe to the searchSubject to perform search with debounce
    this.searchSubject.pipe(
      debounceTime(300), // Adjust the time interval as needed (in milliseconds)
      distinctUntilChanged()
    ).subscribe((searchTerm: string) => {
      this.filterData();
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get('https://praktikum-cpanel-unbin.com/gilang/status.php').subscribe((data: any) => {
      if (data.success) {
        this.originalData = data.result; // Store the original data
        this.filterData(); // Apply any existing filters
      } else {
        console.error('Failed to fetch data');
      }
    });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm); // Pass the search term to the subject
  }

  filterData() {
    // If the search term is empty, reset the filteredData to the original data
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredData = this.originalData;
    } else {
      // Filter the data based on the search term
      this.filteredData = this.originalData.filter(data =>
        data.nama.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
