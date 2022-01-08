import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const WriteOnly = (writeOnly = true) => applyPropertySchemaMetadata('writeOnly', writeOnly);
