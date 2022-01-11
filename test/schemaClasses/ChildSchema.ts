import { JsonSchema, Min, Optional, Required, Type } from '../../src';
import { ParentSchema } from './ParentSchema';

@JsonSchema({
    id: 'https://example.com/inheritance.schema.json'
})
export class ChildSchema extends ParentSchema {
    @Required()
    public childProperty!: string;

    @Optional()
    @Min(42)
    @Type('integer')
    public childPropertyInteger!: number;

    constructor(parentProperty: string, childProperty: string) {
        super(parentProperty);

        this.childProperty = childProperty;
        this.childPropertyInteger = 42;
    }
}
