import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const ReadOnly = (readOnly = true) => applyPropertySchemaMetadata('readOnly', readOnly);
