export class CertificateParameters {
  public certificateName: string | undefined;
  public vaultBaseUrl?: string;
  public subjectName?: string;
  public subjectAlternativeName?: string;
  public certIssuerName?: string;
  public certIssuerProvider?: string;
}