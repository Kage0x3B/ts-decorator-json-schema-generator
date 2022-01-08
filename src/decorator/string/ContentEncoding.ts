import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export type ContentEncodingType = 'base16' | 'base32' | 'base32hex' | 'base64' | string;
export const ContentEncoding = (value: ContentEncodingType) => applyPropertySchemaMetadata('contentEncoding', value);
