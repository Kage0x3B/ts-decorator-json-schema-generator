import { JsonSchema, Max, Min, Required } from '../../src';

@JsonSchema({
    id: 'https://example.com/geographical-location.schema.json',
    title: 'Longitude and Latitude Values',
    description: 'A geographical coordinate.'
})
export class GeoLocationSchema {
    @Min(-90)
    @Max(90)
    @Required()
    public latitude!: number;

    @Min(-180)
    @Max(180)
    @Required()
    public longitude!: number;
}
