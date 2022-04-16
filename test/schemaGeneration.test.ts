import { generateJsonSchema } from '../src';
import { AddressSchema } from './schemaClasses/AddressSchema';
import addressSchemaJson from './schemas/address.schema.json';
import calendarEventSchemaJson from './schemas/calendar.schema.json';
import arrayTestSchemaJson from './schemas/array-test.schema.json';
import inheritanceSchemaJson from './schemas/inheritance.schema.json';
import inheritanceSchema2Json from './schemas/inheritance-2.schema.json';
import subschemaIncludeSchemaJson from './schemas/subschema-test.schema.json';
import subschemaIncludeSchema2Json from './schemas/subschema-test-2.schema.json';
import { CalendarEventSchema } from './schemaClasses/CalendarEventSchema';
import { ArrayTestSchema } from './schemaClasses/ArrayTestSchema';
import { ChildSchema } from './schemaClasses/ChildSchema';
import { SecondChildSchema } from './schemaClasses/SecondChildSchema';

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

        const generatedSchema2 = generateJsonSchema(SecondChildSchema);
        expect(generatedSchema2).toEqual(inheritanceSchema2Json);
    });

    test('Test subschema include option', () => {
        const generatedSchema = generateJsonSchema(ArrayTestSchema, {
            includeSubschemas: 'anonymously'
        });
        expect(generatedSchema).toEqual(subschemaIncludeSchemaJson);

        const generatedSchema2 = generateJsonSchema(ArrayTestSchema, {
            includeSubschemas: 'reference'
        });
        expect(generatedSchema2).toEqual(subschemaIncludeSchema2Json);
    });
});
