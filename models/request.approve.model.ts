export class RequestApprove {
  '@type': string;
  constructor(
    public content: any,
    public evidence: any = {},
    public expirationDate: string,
    public issuanceDate: string,
    public reason: string,
    public type: string
  ) {
    this['@type'] =  type;
  }
}
