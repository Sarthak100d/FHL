import { ResourceTypes } from './CreateResource.types';

export class StorageAccount {
  public id: string | undefined;
  public resourceType: ResourceTypes | undefined;
  public params: StorageAccountParameters | undefined;
}

export class accountTypes {
  public static readonly PremiumLRS = 'Premium_LRS';
  public static readonly PremiumZRS = 'Premium_ZRS';
  public static readonly StandardGRS = 'Standard_GRS'; 
  public static readonly StandardGZRS = 'Standard_GZRS';
  public static readonly StandardLRS = "Standard_LRS";
  public static readonly StandardRAGRS = "Standard_RAGRS";
  public static readonly StandardRAGZRS = "Standard_RAGZRS";
  public static readonly StandardZRS = "Standard_ZRS";
}

export class StorageAccountParameters {
  public storageAccountName: string | undefined;
  public accountType: accountTypes = accountTypes.StandardLRS;
  public kind?: string;
  public minimumTlsVersion?: string;
  public supportsHttpsTrafficOnly: boolean = false;
  public allowBlobPublicAccess: boolean = false;
  public allowSharedKeyAccess: boolean = false;
  public defaultOAuth: boolean = false;
  public accessTier?: string;
  public publicNetworkAccess?: string;
  public allowCrossTenantReplication: boolean = false;
  public networkAclsBypass?: string;
  public networkAclsDefaultAction?: string;
  public dnsEndpointType?: string;
  public keySource?: string;
  public encryptionEnabled: boolean = false;
  public keyTypeForTableAndQueueEncryption?: string;
  public infrastructureEncryptionEnabled: boolean = false;
  public isContainerRestoreEnabled: boolean = false;
  public blobSoftDeleteRetentionDays?: number;
  public isContainerSoftDeleteEnabled: boolean = false;
  public containerSoftDeleteRetentionDays?: number;
  public changeFeed: boolean = false;
  public isVersioningEnabled: boolean = false;
  public isShareSoftDeleteEnabled: boolean = false;
  public shareSoftDeleteRetentionDays?: number;
}