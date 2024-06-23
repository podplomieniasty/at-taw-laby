import {Component, OnInit, Input} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {FilterTextPipe} from "../../pipes/filter-text.pipe";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogItemComponent, CommonModule, SearchBarComponent, FilterTextPipe],
  providers: [DataService, AuthService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  @Input() filterText: string = '';

  public items$: any;

  constructor(private service: DataService) {
  }
  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
  }
}

