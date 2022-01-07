import { Constructable } from './util/Constructable';
import { getMetadataStorage } from './metadata/MetadataStorage';

export function generateJsonSchema(sourceClass: Constructable<any>) {
    const schemaMetadata = getMetadataStorage().getSchemaClassMetadata(sourceClass);
}
