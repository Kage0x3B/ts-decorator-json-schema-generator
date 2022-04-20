import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

export const Pattern = (pattern: string | RegExp) =>
    applyPropertySchemaMetadata(
        'pattern',
        typeof pattern === 'string' ? pattern : pattern.toString().substring(1, pattern.toString().length - 1)
    );
