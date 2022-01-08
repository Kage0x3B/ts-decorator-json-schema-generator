import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const MinProperties = (value: number) => applyPropertySchemaMetadata('minProperties', value);
