import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const ExclusiveMin = (value: number) => applyPropertySchemaMetadata('exclusiveMinimum', value);
