import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderBatch } from 'src/app/models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public batchSize: Number;
  public orderBatches$: Observable<OrderBatch[]>;
  public orderUpdates$: Observable<any[]>;
  public displayOrderUpdates: false;

  constructor(private orderService: OrderService) {
    this.orderBatches$ = this.orderService.orderBatches$;
    this.orderUpdates$ = this.orderService.orderUpdates$;
  }

  public onSubmit(): void {
    this.orderService.postBatch(this.batchSize);
    this.batchSize = undefined;
  }

  public toggleOrderUpdates(): void {
    // Value hasn't changed yet.
    this.orderService.setPublishOrderUpdates(!this.displayOrderUpdates);
  }
}
