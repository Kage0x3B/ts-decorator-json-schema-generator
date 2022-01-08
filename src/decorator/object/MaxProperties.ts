import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const MaxProperties = (value: number) => applyPropertySchemaMetadata('maxProperties', value);
