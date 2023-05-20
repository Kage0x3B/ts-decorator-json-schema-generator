import { applyPropertySchemaMetadata } from '../applySchemaMetadata';
import { JSONSchema7 } from 'json-schema';

type JsonSerializable = string | number | boolean | Date | JsonSerializableObject | JsonSerializable[];

interface JsonSerializableObject {
    [x: string]: string | number | boolean | Date | JsonSerializable;
}

export const CustomSchema = <TKey extends keyof JSONSchema7, TValue extends NonNullable<JSONSchema7[TKey]>>(
    type: TKey,
    value: TValue
) => applyPropertySchemaMetadata(type, value);

/**
 * @deprecated use @{@link CustomSchema}
 */
export const Custom = CustomSchema;
