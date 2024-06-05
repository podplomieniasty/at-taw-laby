import { Component, OnInit } from '@angular/core';
import { BlogItemComponent } from '../blog-item/blog-item.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [BlogItemComponent, CommonModule],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  public items: any;
  
  constructor(private dataService: DataService) {  }

  ngOnInit(): void {
    this.items = this.dataService.getAll();
  }
}
