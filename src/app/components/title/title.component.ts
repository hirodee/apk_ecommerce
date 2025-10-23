import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  itSearch: any;
  @Input() title: string;
  @Input() searchPlaceholder: string;
  @Output() onSearchChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  toggleSearch() {
    if (!this.itSearch) {
      this.itSearch = true;
    } else {
      this.itSearch = false;
    }
  }

  onSearch(event) {
    this.onSearchChange.emit(event);
  }
}
