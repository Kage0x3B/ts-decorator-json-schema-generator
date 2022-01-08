import { applySchemaMetadata } from '../applySchemaMetadata';
import { enumValues } from '../../util/util';
import { JSONSchema7TypeName } from 'json-schema';

type EnumType = { [s: number]: any };

function guessEnumValueType(enumClass: EnumType): JSONSchema7TypeName {
    const enumTypesSet = new Set<string>();

    enumValues(enumClass).map((v) => enumTypesSet.add(typeof v));

    if (enumTypesSet.size === 1) {
        const typeName = [...enumTypesSet][0];

        if (typeName === 'number') {
            return 'number';
        }
    }

    return 'string';
}

export const Enum = (enumClass: EnumType, valueType?: 'string' | 'number' | 'integer') =>
    applySchemaMetadata({
        schemaDecorator: (schema) => {
            schema.type = valueType || guessEnumValueType(enumClass);
            schema.enum = enumValues(enumClass);
        }
    });
