import { applyPropertySchemaMetadata } from '../applySchemaMetadata';
import { JSONSchema7TypeName } from 'json-schema';

export const Type = (value: JSONSchema7TypeName | JSONSchema7TypeName[]) => applyPropertySchemaMetadata('type', value);
