import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const Min = (value: number) => applyPropertySchemaMetadata('minimum', value);
