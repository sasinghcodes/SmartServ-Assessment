import { Component, OnInit } from '@angular/core';
import { ProductInfo } from '../shared/model/product-info.model';
import { ProductService } from '../shared/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  p = 1;
  images = [
    `https://images.unsplash.com/photo-1498661705887-3778d9ecb4ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80`,
    `https://images.fonearena.com/blog/wp-content/uploads/2015/03/Microsoft-Lumia-640.jpg`,
    `https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/04/HuaeweiP30Pro-5-1024x683.jpg`,
    `https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/04/25/Photos/Processed/Xiaomi-kuYD--621x414@LiveMint.jpg`,
    `https://images.livemint.com/img/2019/05/12/600x338/TA_-_2019-05-12T153840.604_1557655733040.png`,
    `https://bestofgleam.com/wp-content/uploads/maxresdefault-c-6.jpg`,
    `https://drop.ndtv.com/TECH/product_database/images/913201720152AM_635_iphone_x.jpeg`,
    `https://media0.mensxp.com/media/content/2018/Aug/top-5-smartphones-for-pubg-lovers5-1533887598.jpg`,
    `https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/meizu%20m6.jpeg?itok=kmrllNRk`
  ];
  productArray: ProductInfo[] = [];
  productData: ProductInfo[] = [];
  sortType = 1;
  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.productArray = this.productData = this._productService.productData;
    this._productService.search.subscribe(
      response => {
        this.filterRecords(response.searchText);
      },
      error => console.log('An Error has occured while searching records...')
    );
  }

  getRandomImages(data: any): string {
    const index = Math.floor(Math.random() * 9);
    return this.images[index];
  }

  getProductName(name: string): string {
    return name.length > 20 ? name.substring(0, 17) + '...' : name;
  }

  sortProductLayout(typeSelected: string, pData: any): void {
    this.p = 1; // if sorted we will reset to the start page again.
    this.sortType = parseInt(typeSelected, 10);
    this.productArray = [];
    switch (this.sortType) {
      case 1:
        // relevance
        this.productArray = pData.sort(
          (a, b) => a.id - b.id
        );
        break;
      case 2:
        // popularity
        this.productArray = pData.sort(
          (a, b) => b.popularity - a.popularity
        );
        break;
      case 3:
        // low to high
        this.productArray = pData.sort(
          (a, b) => a.price - b.price
        );
        break;
      case 4:
        // high to low
        this.productArray = pData.sort(
          (a, b) => b.price - a.price
        );
        break;
    }
  }

  filterRecords(searchText: string): void {
    const dummyStore: ProductInfo[] = [];
    this.productData.find((object, index) => {
      if (object.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
        dummyStore.push(object);
      }
      if (index === 999) { return true; }
    });
    this.sortProductLayout(this.sortType.toString(), dummyStore);
  }
}
