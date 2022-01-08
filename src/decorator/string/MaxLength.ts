import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const MaxLength = (value: number) => applyPropertySchemaMetadata('maxLength', value);
