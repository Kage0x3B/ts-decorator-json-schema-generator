import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const ContentMediaType = (mediaType: string) => applyPropertySchemaMetadata('contentMediaType', mediaType);
