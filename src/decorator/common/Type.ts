import { applyCustomTypeMetadata } from '../applySchemaMetadata';
import { JSONSchema7TypeName } from 'json-schema';
import { Constructable } from '../../util/Constructable';

export const Type = (typeNameOrClass: Constructable<any> | ('unset' | JSONSchema7TypeName | JSONSchema7TypeName[])) => {
    if (typeof typeNameOrClass === 'function') {
        return applyCustomTypeMetadata({
            typeClass: typeNameOrClass,
            typeName: 'object'
        });
    } else {
        return applyCustomTypeMetadata({
            typeName: typeNameOrClass
        });
    }
};
