import { JsonSchema, Required, Type } from '../../src';

@JsonSchema({
    id: 'https://example.com/some-example-object.schema.json',
    title: 'Example object'
})
class SomeExampleObject {
    @Required()
    @Type('integer')
    public someNumber!: number;
}

@JsonSchema({
    id: 'https://example.com/unknown-object-type-error.schema.json',
    description:
        "Can't detect type from typescripts design:type annotation, resulting in cryptic error when @Type isn't manually set."
})
export class UnknownObjectTypeErrorSchema {
    @Required()
    public someExampleObject!: Partial<SomeExampleObject>;

    @Type(SomeExampleObject)
    public someExampleObjectWithType!: Partial<SomeExampleObject>;
}
