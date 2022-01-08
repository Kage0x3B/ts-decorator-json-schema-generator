import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

// @ts-ignore
export const Deprecated = (deprecated = true) => applyPropertySchemaMetadata('deprecated', deprecated);
