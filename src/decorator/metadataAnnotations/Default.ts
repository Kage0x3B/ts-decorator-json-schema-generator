import { applyPropertySchemaMetadata } from '../applySchemaMetadata';
import { JSONSchema7Type } from 'json-schema';

export const Default = (value: JSONSchema7Type) =>
    applyPropertySchemaMetadata('default', value as unknown as NonNullable<JSONSchema7Type>);
