import { ResourceTypes } from './CreateResource.types';

export class Certificate {
  public id: string | undefined;
  public resourceType: ResourceTypes = ResourceTypes.CERTIFICATE;
  public params: CertificateParameters | undefined;
}
export class CertificateParameters {
  public certificateName: string | undefined;
  public vaultBaseUrl?: string;
  public subjectName?: string;
  public subjectAlternativeName?: string;
  public certIssuerName?: string;
  public certIssuerProvider?: string;
}