import { applyPropertySchemaMetadata, applySchemaMetadataList } from '../applySchemaMetadata';
import { Constructable } from '../../util/Constructable';
import { JSONSchema7TypeName } from 'json-schema';
import { generateObjectSchema } from '../../JsonSchema7Generator';
import { SchemaMetadata } from '../SchemaMetadata';

export const Items = (
    type: Constructable<any> | JSONSchema7TypeName
): ((target: any, propertyKey?: string | undefined) => void) => {
    if (typeof type === 'string') {
        return applyPropertySchemaMetadata('items', {
            type
        });
    } else {
        return applySchemaMetadataList(
            new SchemaMetadata({
                schemaDecorator: (options, schema) => {
                    schema.items = generateObjectSchema(type.prototype, options, 1);
                }
            })
        );
    }
};
