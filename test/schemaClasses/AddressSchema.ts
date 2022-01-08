export class AddressSchema {
    public postOfficeBox?: string;
    public extendedAddress?: string;
    public streetAddress?: string;
    public locality!: string;
    public region!: string;
    public postalCode?: string;
    public countryName!: string;
}
