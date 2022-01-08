import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const MinItems = (value: number) => applyPropertySchemaMetadata('minItems', value);
