import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const MultipleOf = (value: number) => applyPropertySchemaMetadata('multipleOf', value);
