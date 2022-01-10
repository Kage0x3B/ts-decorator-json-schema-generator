import { JsonSchema, Required } from '../../src';
import { Items } from '../../src/decorator/array/Items';

@JsonSchema({
    id: 'https://example.com/some-schema.schema.json'
})
class SomeSchema {
    @Required()
    public testNumber!: number;
}

@JsonSchema({
    id: 'https://example.com/array-test.schema.json'
})
export class ArrayTestSchema {
    @Required()
    @Items(SomeSchema)
    public objectArray!: SomeSchema[];

    @Required()
    @Items('string')
    public primitiveArray!: string[];
}
