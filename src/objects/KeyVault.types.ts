export class skuNameValues {
  public static readonly standard = 'Standard';
  public static readonly premium = 'Premium';
}

export class KeyVaultParameters {
  public keyVaultName: string | undefined;
  public enabledForTemplateDeployment: boolean = false;
  public enabledForDeployment: boolean = false;
  public skuName?: skuNameValues;
  public ObjectId?: string;
}