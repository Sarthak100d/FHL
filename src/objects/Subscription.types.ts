export class SubscriptionParameters {
  public displayName: string | undefined;
  public initialOwnerPrincipalId?: string;
  public billingScope?: string;
  public billingPcCode?: string;
  public billingCostCategory?: string;
  public billingAirsRegId?: string;
  public roleAssignment: boolean = false;
  public backfilledSubsId ?: string;
}