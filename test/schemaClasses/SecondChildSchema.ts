import { JsonSchema, Required } from '../../src';
import { ParentSchema } from './ParentSchema';

@JsonSchema({
    id: 'https://example.com/inheritance-2.schema.json'
})
export class SecondChildSchema extends ParentSchema {
    @Required()
    public differentChildProperty!: number;

    constructor(parentProperty: string, differentChildProperty: number) {
        super(parentProperty);

        this.differentChildProperty = differentChildProperty;
    }
}
