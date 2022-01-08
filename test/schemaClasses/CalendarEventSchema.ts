export class CalendarEventSchema {
    public startDate!: string;
    public endDate?: string;
    public summary!: string;
    public location?: string;
    public url?: string;
    public duration?: string;
    public recurrenceDate?: string;
    public recurrenceRule?: string;
    public category?: string;
    public description?: string;
    public geoLocation?: string;
}
