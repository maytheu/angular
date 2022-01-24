import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  product: Product;
  update: Boolean = false;
  form = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    price: ['', Validators.required],
    specification: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    if (this.router.url === `/update/${id}`) {
      this.update = true;
      this.productService.getById(id).subscribe((product) => {
        this.product = product;
        this.form.patchValue({
          id: product.id,
          price: this.product.price,
          name: this.product.name,
          specification: this.product.specification,
        });
      });
    }
  }

  submitForm() {
    if (this.update) {
      const id = Number(this.route.snapshot.params.id);
      this.productService.update(id, this.form.value).subscribe();
      this.router.navigateByUrl('/');
    } else {
      this.productService.create(this.form.value).subscribe();
      this.router.navigateByUrl('/');
    }
  }
}
