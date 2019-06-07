import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this._productService.fetchProductList();
  }
}
