import { ResourceTypes } from './CreateResource.types';

export class ServiceBus {
  public id: string | undefined;
  public resourceType: ResourceTypes | undefined;
  public params: ServiceBusParameters | undefined;
}

export class ServiceBusParameters {
  public serviceBusNamespaceName: string | undefined;
  public serviceBusTopicName?: string;
  public serviceBusQueueName?: string;
  public serviceBusSubscriptionName?: string;
}