import { generateJsonSchema } from '../src';
import { AddressSchema } from './schemaClasses/AddressSchema';
import addressSchemaJson from './schemas/address.schema.json';
import calendarEventSchemaJson from './schemas/calendar.schema.json';
import { CalendarEventSchema } from './schemaClasses/CalendarEventSchema';

describe('Generate test schemas', () => {
    test('Test AddressSchema', () => {
        const generatedSchema = generateJsonSchema(AddressSchema);
        expect(generatedSchema).toEqual(addressSchemaJson);
    });

    test('Test CalendarEventSchema', () => {
        const generatedSchema = generateJsonSchema(CalendarEventSchema);
        expect(generatedSchema).toEqual(calendarEventSchemaJson);
    });
});
