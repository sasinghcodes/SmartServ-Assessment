import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
  }

  onProductSearch(searchQuery: any): void {
    this._productService.search.next(searchQuery);
  }
}
