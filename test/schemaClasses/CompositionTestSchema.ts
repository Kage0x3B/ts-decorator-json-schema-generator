import { JsonSchema, Optional, Required } from '../../src';
import { AnyOf } from '../../src/decorator/composition/AnyOf';
import { AllOf } from '../../src/decorator/composition/AllOf';

@JsonSchema({
    id: 'https://example.com/first-subschema.schema.json'
})
class FirstSubschema {
    @Required()
    public aTestValue!: number;
}

@JsonSchema({
    id: 'https://example.com/second-subschema.schema.json'
})
class SecondSubschema {
    @Required()
    public completelyDifferentValue!: number;

    @Optional()
    public isDifferent!: boolean;
}

@JsonSchema({
    id: 'https://example.com/composition-test.schema.json',
    description:
        'Tests json schema composition https://json-schema.org/understanding-json-schema/reference/combining.html'
})
export class CompositionTestSchema {
    @Optional()
    @AnyOf(FirstSubschema, SecondSubschema)
    public anyClass?: FirstSubschema | SecondSubschema;

    @Optional()
    @AllOf(FirstSubschema, {
        properties: { extraProperty: { type: 'number' } }
    })
    public firstSubschemaWithExtra?: FirstSubschema & { extraProperty: number };
}
