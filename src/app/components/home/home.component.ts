import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService
      .getAll()
      .subscribe((product) => (this.products = product));
  }

  delete(id): void {
    this.productService.delete(id).subscribe();
    this.router.navigateByUrl('/');
  }
}
