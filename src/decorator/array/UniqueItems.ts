import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const UniqueItems = (value = true) => applyPropertySchemaMetadata('uniqueItems', value);
