import { List } from "@fluentui/react";
import { Database } from "./Database.types";
import { KeyVault } from "./KeyVault.types";
import { ServiceBus } from "./ServiceBus.types";
import { Certificate } from "./Certificate.types";
import { StorageAccount } from "./StorageAccount.types";
import { Subscription } from "./Subscription.types";

export enum ResourceTypes {
  SERVICE_BUS = "azure.servicebus",
  SERVICE_BUS_QUEUE = "azure.servicebus.queue",
  SERVICE_BUS_TOPIC = "azure.servicebus.topic",
  SERVICE_BUS_TOPIC_SUBS = "azure.service.topic.subscription",
  DATABASE = "azure.ms.sql",
  KEYVAULT = "azure.keyvault",
  STORAGE_ACCOUNT_BLOB = "azure.storage.blob",
  STORAGE_ACCOUNT_FILESHARE= "azure.storage.fileshare",
  AZURE_FUNCTION = "azure.function",
  CERTIFICATE = "azure.certificate",
  SUBSCRIPTION = "azure.subscription",
}

export class CreateResourceParameters {
  public serviceName: string | undefined;
  public serviceId: string | undefined;
  public resourceGroupName: string | undefined;
  public owner: string | undefined;
  //public resourcesSelected: any[] = [];
  public keyVaultList: Array<KeyVault> | undefined;
  public databaseList: Array<Database> | undefined;
  public serviceBusList: Array<ServiceBus> | undefined;
  public certificateList: Array<Certificate> | undefined;
  public storageAccountList: Array<StorageAccount> | undefined;
  public subscriptionList: Array<Subscription> | undefined;
}