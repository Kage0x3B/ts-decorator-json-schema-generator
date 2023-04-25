import { applyCompositionSchemaMetadata } from '../applySchemaMetadata';
import { Constructable } from '../../util';
import { JSONSchema7 } from 'json-schema';
import { generateObjectSchema } from '../../JsonSchema7Generator';
import { isConstructor } from '../../util/util';

export const OneOf = (
    ...schemaOrClasses: (Constructable<any> | JSONSchema7 | (Constructable<any> | JSONSchema7)[])[]
): ((target: any, propertyKey: string) => void) => {
    return applyCompositionSchemaMetadata({
        schemaDecorator: (options, schema) => {
            schema.oneOf = schemaOrClasses
                .flat()
                .map((type) => (isConstructor(type) ? generateObjectSchema(type.prototype, options, 1) : type));
        }
    });
};
