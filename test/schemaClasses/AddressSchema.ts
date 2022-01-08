import { DependentRequired, JsonSchema, Optional, Required } from '../../src';

@JsonSchema({
    id: 'https://example.com/address.schema.json',
    description: 'An address similar to https://microformats.org/wiki/h-card'
})
export class AddressSchema {
    @Optional()
    @DependentRequired('streetAddress')
    public postOfficeBox?: string;

    @Optional()
    @DependentRequired('streetAddress')
    public extendedAddress?: string;

    @Optional()
    public streetAddress?: string;

    @Required()
    public locality!: string;

    @Required()
    public region!: string;

    @Optional()
    public postalCode?: string;

    @Required()
    public countryName!: string;
}
