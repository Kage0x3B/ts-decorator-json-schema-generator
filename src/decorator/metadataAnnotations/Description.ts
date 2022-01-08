import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const Description = (value: string) => applyPropertySchemaMetadata('description', value);
