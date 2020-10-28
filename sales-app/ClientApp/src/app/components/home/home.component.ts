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
  public orderBatches$: Observable<Map<string, OrderBatch>>;
  public orderUpdates$: Observable<any[]>;

  constructor(private orderService: OrderService) {
    this.orderBatches$ = this.orderService.orderBatches$;
    this.orderUpdates$ = this.orderService.orderUpdates$;
  }

  public onSubmit(): void {
    this.orderService.postBatch(this.batchSize);
    this.batchSize = undefined;
  }
}
