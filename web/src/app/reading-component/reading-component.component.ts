import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-reading-component',
  standalone: true,
  imports: [],
  templateUrl: './reading-component.component.html',
  styleUrl: './reading-component.component.css'
})
export class ReadingComponentComponent implements OnInit {
  data: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('PythonEnclosure').subscribe((response) => {
      this.data = response;
    });
}
}
