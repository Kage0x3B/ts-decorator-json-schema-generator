import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const Max = (value: number) => applyPropertySchemaMetadata('maximum', value);
