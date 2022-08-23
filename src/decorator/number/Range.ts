import { applySchemaMetadataList } from '../applySchemaMetadata';
import { SchemaMetadata } from '../SchemaMetadata';

export const Range = (min: number, max: number) =>
    applySchemaMetadataList(
        new SchemaMetadata({
            type: 'minimum',
            value: min
        }),
        new SchemaMetadata({
            type: 'maximum',
            value: max
        })
    );
