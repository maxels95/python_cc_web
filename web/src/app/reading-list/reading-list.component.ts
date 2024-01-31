import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reading } from './reading.model';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit {
  readings: Reading[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReadings();
  }

  fetchReadings(): void {
    const apiUrl = 'http://localhost:5262/PythonEnclosure';
    this.http.get<Reading[]>(apiUrl)
      .subscribe(
        (data) => {
          this.readings = data;
        },
        (error) => {
          console.error('Error fetching readings:', error);
        }
      );
  }
}
