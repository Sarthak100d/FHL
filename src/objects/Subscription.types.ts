import { ResourceTypes } from './CreateResource.types';

export class Subscription {
  public id: string | undefined;
  public resourceType: ResourceTypes = ResourceTypes.SUBSCRIPTION;
  public params: SubscriptionParameters | undefined;
}

export class SubscriptionParameters {
  public displayName: string | undefined;
  public initialOwnerPrincipalId?: string;
  public billingScope?: string;
  public billingPcCode?: string;
  public billingCostCategory?: string;
  public billingAirsRegId?: string;
  public roleAssignment: boolean = false;
  public backfilledSubsId?: string;
}