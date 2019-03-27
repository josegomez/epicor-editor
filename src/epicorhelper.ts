
 export class EpicorSettings
 {
    epicorClientFolder:string|undefined="";
    epicorCustomizationFolder:string|undefined="";
    DNSpy:string|undefined="";
    
    constructor(epicorCustomizationFolder:string|undefined,epicorClientFolder:string|undefined,DNSpy:string|undefined)
    {
        this.epicorClientFolder = epicorClientFolder;
        this.epicorCustomizationFolder = epicorCustomizationFolder;
        this.DNSpy=DNSpy;
    }
 }