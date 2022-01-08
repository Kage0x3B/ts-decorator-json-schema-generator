import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const MaxItems = (value: number) => applyPropertySchemaMetadata('maxItems', value);
