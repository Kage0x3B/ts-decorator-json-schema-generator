import { ExclusiveMax, ExclusiveMin, JsonSchema, Max, Min, Range, Required } from '../../src';

@JsonSchema({
    id: 'https://example.com/full-decorator-test.schema.json',
    description: 'Test all decorators'
})
export class FullDecoratorTestSchema {
    @Required()
    @Min(1)
    @Max(3)
    public someNumber!: number;

    @Range(2, 4)
    public someSecondNumber!: number;

    @ExclusiveMin(5)
    @ExclusiveMax(10)
    public someThirdNumber!: number;
}
