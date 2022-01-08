import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const ExclusiveMax = (value: number) => applyPropertySchemaMetadata('exclusiveMaximum', value);
