import { applySchemaMetadataList } from '../applySchemaMetadata';
import { Constructable } from '../../util';
import { JSONSchema7 } from 'json-schema';
import { generateObjectSchema } from '../../JsonSchema7Generator';
import { SchemaMetadata } from '../SchemaMetadata';
import { isConstructor } from '../../util/util';

export const Not = (
    schemaOrClass: Constructable<any> | JSONSchema7
): ((target: any, propertyKey?: string | undefined) => void) => {
    return applySchemaMetadataList(
        new SchemaMetadata({
            schemaDecorator: (options, schema) => {
                schema.not = isConstructor(schemaOrClass)
                    ? generateObjectSchema(schemaOrClass.prototype, options, 1)
                    : schemaOrClass;
            }
        })
    );
};
