import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const MinLength = (value: number) => applyPropertySchemaMetadata('minLength', value);
