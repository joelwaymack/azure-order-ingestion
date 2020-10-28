package com.sales.orderprocessing.models;

import java.util.Date;
import java.util.Map;

public class EventSchema {

  public String topic;
  public String subject;
  public String eventType;
  public Date eventTime;
  public String id;
  public String dataVersion;
  public String metadataVersion;
  public Order data;

  @Override
  public String toString() {
      return "Processed event " + id + " for order " + data.id;
  }
}