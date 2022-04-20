import { JsonSchema, Pattern, Required } from '../../src';

@JsonSchema({
    id: 'https://example.com/regex-pattern.schema.json',
    description: 'For testing regex patterns'
})
export class RegexPatternSchema {
    @Required()
    @Pattern(/^Germany|France$/)
    public countryName!: string;

    @Required()
    @Pattern('^[A-Za-z]{2}$')
    public countryCode!: string;
}
