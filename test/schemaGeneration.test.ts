import { generateJsonSchema, isSchemaClass } from '../src';
import { AddressSchema } from './schemaClasses/AddressSchema';
import addressSchemaJson from './schemas/address.schema.json';
import calendarEventSchemaJson from './schemas/calendar.schema.json';
import arrayTestSchemaJson from './schemas/array-test.schema.json';
import inheritanceSchemaJson from './schemas/inheritance.schema.json';
import inheritanceSchema2Json from './schemas/inheritance-2.schema.json';
import subschemaIncludeSchemaJson from './schemas/subschema-test.schema.json';
import subschemaIncludeSchema2Json from './schemas/subschema-test-2.schema.json';
import regexPatternSchemaJson from './schemas/regex-pattern.schema.json';
import fullDecoratorTestSchemaJson from './schemas/full-decorator-test.schema.json';
import compositionTestSchemaJson from './schemas/composition-test.schema.json';
import customCompositionTestSchemaJson from './schemas/custom-composition-test.schema.json';
import { CalendarEventSchema } from './schemaClasses/CalendarEventSchema';
import { ArrayTestSchema } from './schemaClasses/ArrayTestSchema';
import { ChildSchema } from './schemaClasses/ChildSchema';
import { SecondChildSchema } from './schemaClasses/SecondChildSchema';
import { NotSchemaClass } from './schemaClasses/NotSchemaClass';
import { NoPropertySchemaClass } from './schemaClasses/NoPropertySchemaClass';
import { RegexPatternSchema } from './schemaClasses/RegexPatternSchema';
import { FullDecoratorTestSchema } from './schemaClasses/FullDecoratorTestSchema';
import { CustomCompositionTestSchema } from './schemaClasses/CustomCompositionTestSchema';
import { CompositionTestSchema } from './schemaClasses/CompositionTestSchema';

describe('Generate test schemas', () => {
    test('Test AddressSchema', () => {
        expect(generateJsonSchema(AddressSchema)).toEqual(addressSchemaJson);
    });

    test('Test CalendarEventSchema', () => {
        expect(generateJsonSchema(CalendarEventSchema)).toEqual(calendarEventSchemaJson);
    });

    test('Test array types', () => {
        expect(generateJsonSchema(ArrayTestSchema)).toEqual(arrayTestSchemaJson);
    });

    test('Test schema inheritance', () => {
        expect(generateJsonSchema(ChildSchema)).toEqual(inheritanceSchemaJson);

        expect(generateJsonSchema(SecondChildSchema)).toEqual(inheritanceSchema2Json);
    });

    test('Test subschema include option', () => {
        expect(
            generateJsonSchema(ArrayTestSchema, {
                includeSubschemas: 'anonymously'
            })
        ).toEqual(subschemaIncludeSchemaJson);

        expect(
            generateJsonSchema(ArrayTestSchema, {
                includeSubschemas: 'reference'
            })
        ).toEqual(subschemaIncludeSchema2Json);
    });

    test('Test isSchemaClass function', () => {
        expect(isSchemaClass(undefined)).toEqual(false);
        expect(isSchemaClass(null)).toEqual(false);
        expect(isSchemaClass(42)).toEqual(false);
        expect(isSchemaClass('Test!')).toEqual(false);
        expect(isSchemaClass(NotSchemaClass)).toEqual(false);

        expect(isSchemaClass(AddressSchema)).toEqual(true);
        expect(isSchemaClass(CalendarEventSchema)).toEqual(true);
        expect(isSchemaClass(ArrayTestSchema)).toEqual(true);
        expect(isSchemaClass(ChildSchema)).toEqual(true);
        expect(isSchemaClass(SecondChildSchema)).toEqual(true);
        expect(isSchemaClass(NoPropertySchemaClass)).toEqual(true);
    });

    test('Test regex pattern decorators', () => {
        expect(generateJsonSchema(RegexPatternSchema)).toEqual(regexPatternSchemaJson);
    });

    test('Test all decorators (currently WIP)', () => {
        expect(generateJsonSchema(FullDecoratorTestSchema)).toEqual(fullDecoratorTestSchemaJson);
    });

    test('Test custom decorator with schema composition', () => {
        expect(generateJsonSchema(CustomCompositionTestSchema)).toEqual(customCompositionTestSchemaJson);
    });

    test('Test schema composition', () => {
        expect(generateJsonSchema(CompositionTestSchema)).toEqual(compositionTestSchemaJson);
    });
});
