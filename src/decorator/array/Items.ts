import { applyPropertySchemaMetadata } from '../applySchemaMetadata';
import { Constructable } from '../../util/Constructable';
import { JSONSchema7TypeName } from 'json-schema';
import { generateObjectSchema } from '../../JsonSchema7Generator';

export const Items = (
    type: Constructable<any> | JSONSchema7TypeName
): ((target: any, propertyKey?: string | undefined) => void) => {
    if (typeof type === 'string') {
        return applyPropertySchemaMetadata('items', {
            type
        });
    } else {
        return applyPropertySchemaMetadata('items', generateObjectSchema(type.prototype, 1));
    }
};
