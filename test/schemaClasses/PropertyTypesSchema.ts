import { Format, JsonSchema, Required } from '../../src';

@JsonSchema({
    id: 'https://example.com/property-types.schema.json'
})
export class PropertyTypesSchema {
    @Required()
    @Format('email')
    email!: string;
}
