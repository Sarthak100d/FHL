import { ResourceTypes } from './CreateResource.types';

export class Database {
  public id: string | undefined;
  public resourceType: ResourceTypes = ResourceTypes.DATABASE;
  public params: DatabaseParameters | undefined;
}

export class DatabaseParameters {
  public sqlServerName: string | undefined;
  public sqlDatabaseName: string | undefined;
  public fcmdbAdminCredSecretKey?: string;
  public dtuCapacity?: string;
  public maxSizeBytes?: string;
}