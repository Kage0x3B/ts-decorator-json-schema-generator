import { CustomSchema, JsonSchema, Optional, Type } from '../../src';

@JsonSchema({
    id: 'https://example.com/custom-composition-test.schema.json',
    description:
        'Tests custom json schema composition using the @Custom decorator https://json-schema.org/understanding-json-schema/reference/combining.html'
})
export class CustomCompositionTestSchema {
    @Optional()
    @Type('unset')
    @CustomSchema('allOf', [{ type: 'string' }, { maxLength: 5 }])
    public testString?: string;
}
