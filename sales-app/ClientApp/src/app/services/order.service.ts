import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderBatch } from '../models';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string;
  private hubConnection: HubConnection;
  private orderUpdates = [];
  private _orderUpdates$: BehaviorSubject<any[]> = new BehaviorSubject(this.orderUpdates);
  private orderBatches: OrderBatch[] = [];
  private _orderBatches$: BehaviorSubject<OrderBatch[]> = new BehaviorSubject([]);
  private publishOrderUpdates = false;

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  public get orderUpdates$(): Observable<any[]> {
    return this._orderUpdates$;
  }

  public get orderBatches$(): Observable<OrderBatch[]> {
    return this._orderBatches$;
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.setupOrderUpdates(baseUrl);
  }

  public postBatch(batchSize: Number): Observable<OrderBatch> {
    const url = batchSize && batchSize > 0 ? this.url + '?batchSize=' + batchSize : this.url;
    const orderBatch$ = this.http.post<OrderBatch>(url, undefined, this.httpOptions);

    orderBatch$.subscribe((orderBatch) => {
      this.orderBatches.unshift(orderBatch);
      this._orderBatches$.next(this.orderBatches);
    });

    return orderBatch$;
  }

  public setPublishOrderUpdates(publishOrderUpdates): void {
    this.publishOrderUpdates = publishOrderUpdates;

    if (!publishOrderUpdates) {
      this.orderUpdates = [];
      this._orderUpdates$.next(this.orderUpdates);
    }
  }

  private setupOrderUpdates(baseUrl: string): void {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('https://func-order-updates.azurewebsites.net/api')
    .build();

    this.hubConnection.start().then(() => {
      this.url = `${baseUrl}orderbatches/${this.hubConnection.connectionId}`;
    });

    this.hubConnection.on('orderUpdated', (data) => {
      this.updateOrderReceived(data);
    });
  }

  private updateOrderReceived(data): void {
    // Not using authenticated users so only handle orders created by this browser.
    if (data.producerId && data.producerId == this.hubConnection.connectionId && data.status == "Shipped") {
      
      const batch = this.orderBatches.find((b) => b.id == data.batchId);
      batch.shippedOrders = batch.shippedOrders == undefined ? 1 : batch.shippedOrders + 1;
      batch.percentOrdersShipped = Math.ceil((batch.shippedOrders / batch.orders.length) * 100);
      this._orderBatches$.next(this.orderBatches);

      if(this.publishOrderUpdates) {
        this.orderUpdates.unshift(data);
        this._orderUpdates$.next(this.orderUpdates);
      }
    }
  }
}
