import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductInfo } from '../model/product-info.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productData: ProductInfo[] = [];
  search: EventEmitter<string> = new EventEmitter<string>();
  constructor(private _httpRequest: HttpClient) { }

  fetchProductList(): void {
    const baseUrl = 'https://s3.amazonaws.com/open-to-cors/assignment.json';
    this._httpRequest.get(baseUrl).subscribe(
      response => {
        try {
          let key;
          const data = response['products'];
          for (key in data) {
            if (data.hasOwnProperty(key)) {
              const objectData = {
                id: parseInt(key, 10),
                title: data[key].title,
                subcategory: data[key].subcategory,
                price: parseInt(data[key].price, 10),
                popularity: parseInt(data[key].popularity, 10)
              };
              this.productData.push(objectData);
            }
          }
        } catch (err) {
          console.log(
            'Error has occured while parsing the data from the server.Please contact your system administrator.'
          );
        }
      },
      error => console.log('Error has occured while fetching the data.Please contact your system administrator.')
    );
  }
}
