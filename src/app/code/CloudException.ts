export class CloudException {
  constructor(protected message: string) {
  }
  
  getMessage(): string {
    this.beforeGetMessage();
    return this.message;
  }
  
  beforeGetMessage(): void {
    /*
     * TODO: implement Translate later
     *
     * Fỉre event
     */
    
  }
}
