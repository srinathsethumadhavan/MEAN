


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Product } from './product.model';
@Injectable()
export class ProductService {


  selectedProduct: Product;
  products: Product[];
  readonly baseURL = 'http://localhost:9000/products';
  

  constructor(private http: HttpClient) { }

  postProduct(pro: Product) {
    return this.http.post(this.baseURL, pro);
  }

  getProductList() {
    return this.http.get(this.baseURL);
  }

  patchProduct(pro: Product) {
    return this.http.patch(this.baseURL + `/${pro._id}`, pro);
  }

  deleteProduct(_id: number) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
