import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {ProductService} from '../shared/product.service'
import { Product } from '../shared/product.model';
declare var M: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})
export class ProductComponent implements OnInit {

  constructor(public productService:ProductService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshProductList();
  }

  resetForm(form?: NgForm){
if(form)
form.reset();
this.productService.selectedProduct = {
  _id: 0,
  name: "",
  quantity: 0,
  price: 0,
 
}
  }

  onSubmit(form: NgForm) {
    if (!form.value._id) {
      this.productService.postProduct(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshProductList();
                M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }

    else {
      this.productService.patchProduct(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshProductList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshProductList() {
    this.productService.getProductList().subscribe((res) => {
      this.productService.products = res as Product[];
    });
  }

  onEdit(pro: Product) {
    this.productService.selectedProduct = pro;
  }

  onDelete(_id: number, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.productService.deleteProduct(_id).subscribe((res) => {
        this.refreshProductList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
}