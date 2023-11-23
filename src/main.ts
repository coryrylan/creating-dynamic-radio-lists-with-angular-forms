import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import 'zone.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <a href="">
      <h1>Dynamic Radio List in Angular</h1>
    </a>

    <form [formGroup]="form" (ngSubmit)="submit()">

      <label *ngFor="let order of orders">
        <input formControlName="orders" type="radio" name="orders" [value]="order.id" />
        {{order.name}}
      </label>

      <br>
      <button>submit</button>
    </form>
  `,
})
export class App {
form: FormGroup;
  orders: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: ['']
    });

    // mimic async orders
    of(this.getOrders()).subscribe(orders => {
      this.orders = orders;
      this.form.controls['orders'].patchValue(this.orders[0].id);
    });

    // synchronous orders
    // this.orders = this.getOrders();
    // this.form.controls.orders.patchValue(this.orders[0].id);
  }

  getOrders() {
    return [
      { id: 100, name: 'order 1' },
      { id: 200, name: 'order 2' },
      { id: 300, name: 'order 3' },
      { id: 400, name: 'order 4' }
    ];
  }

  submit() {
    console.log(this.form.value);
  }
}

bootstrapApplication(App);
