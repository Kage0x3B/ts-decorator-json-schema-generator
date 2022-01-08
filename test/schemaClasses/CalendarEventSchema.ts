import { Description, JsonSchema, Optional, Required, Type } from '../../src';
import { GeoLocationSchema } from './GeoLocationSchema';

@JsonSchema({
    id: 'https://example.com/calendar.schema.json',
    description: 'A representation of an event'
})
export class CalendarEventSchema {
    @Required()
    @Description('Event starting time')
    public startDate!: string;

    @Optional()
    @Description('Event ending time')
    public endDate?: string;

    @Required()
    public summary!: string;

    @Optional()
    public location?: string;

    @Optional()
    public url?: string;

    @Optional()
    @Description('Event duration')
    public duration?: string;

    @Optional()
    @Description('Recurrence date')
    public recurrenceDate?: string;

    @Optional()
    @Description('Recurrence rule')
    public recurrenceRule?: string;

    @Optional()
    public category?: string;

    @Optional()
    public description?: string;

    @Optional()
    @Type(GeoLocationSchema)
    public geoLocation?: GeoLocationSchema;
}
