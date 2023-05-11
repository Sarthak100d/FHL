import { ResourceTypes } from './CreateResource.types';

export class KeyVault {
  public id: string | undefined;
  public resourceType: ResourceTypes = ResourceTypes.KEYVAULT;
  public params: KeyVaultParameters | undefined;
}

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