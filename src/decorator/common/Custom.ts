import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

type JsonSerializable = string | number | boolean | Date | JsonSerializableObject | JsonSerializable[];

interface JsonSerializableObject {
    [x: string]: string | number | boolean | Date | JsonSerializable;
}

// @ts-ignore
export const Custom = (type: string, value: JsonSerializable) => applyPropertySchemaMetadata(type, value);
