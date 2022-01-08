import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const Pattern = (pattern: RegExp) => applyPropertySchemaMetadata('pattern', pattern.toString());
