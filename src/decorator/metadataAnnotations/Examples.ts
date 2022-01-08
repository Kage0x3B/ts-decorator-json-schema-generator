import { applyPropertySchemaMetadata } from '../applySchemaMetadata';
import { JSONSchema7Type } from 'json-schema';

export const Examples = (examples: JSONSchema7Type[]) => applyPropertySchemaMetadata('examples', examples);
