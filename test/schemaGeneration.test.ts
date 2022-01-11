import { generateJsonSchema } from '../src';
import { AddressSchema } from './schemaClasses/AddressSchema';
import addressSchemaJson from './schemas/address.schema.json';
import calendarEventSchemaJson from './schemas/calendar.schema.json';
import arrayTestSchemaJson from './schemas/array-test.schema.json';
import inheritanceSchemaJson from './schemas/inheritance.schema.json';
import { CalendarEventSchema } from './schemaClasses/CalendarEventSchema';
import { ArrayTestSchema } from './schemaClasses/ArrayTestSchema';
import { ChildSchema } from './schemaClasses/ChildSchema';

describe('Generate test schemas', () => {
    test('Test AddressSchema', () => {
        const generatedSchema = generateJsonSchema(AddressSchema);
        expect(generatedSchema).toEqual(addressSchemaJson);
    });

    test('Test CalendarEventSchema', () => {
        const generatedSchema = generateJsonSchema(CalendarEventSchema);
        expect(generatedSchema).toEqual(calendarEventSchemaJson);
    });

    test('Test array types', () => {
        const generatedSchema = generateJsonSchema(ArrayTestSchema);
        expect(generatedSchema).toEqual(arrayTestSchemaJson);
    });

    test('Test schema inheritance', () => {
        const generatedSchema = generateJsonSchema(ChildSchema);
        expect(generatedSchema).toEqual(inheritanceSchemaJson);
    });
});
