import { Component, Input } from '@angular/core';
import { SummaryPipe } from '../../pipes/summary.pipe';

@Component({
  selector: 'blog-item-text',
  standalone: true,
  imports: [SummaryPipe],
  templateUrl: './blog-item-text.component.html',
  styleUrl: './blog-item-text.component.css'
})
export class BlogItemTextComponent {
  @Input() text?: string;
}
