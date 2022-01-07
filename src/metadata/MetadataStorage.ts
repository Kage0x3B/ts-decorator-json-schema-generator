import { SchemaMetadata } from './SchemaMetadata';
import { Constructable } from '../util/Constructable';
import { getGlobal } from '../util/getGlobal';

/**
 * Storage all metadatas.
 *
 * Based on metadata storage of the class-validator library,
 * https://github.com/typestack/class-validator/blob/develop/src/metadata/MetadataStorage.ts
 */
export class MetadataStorage {
    private schemaMetadataList: SchemaMetadata[] = [];

    get hasSchemaMetaData(): boolean {
        return !!this.schemaMetadataList.length;
    }

    /**
     * Adds a new schema metadata.
     */
    addSchemaMetadata(metadata: SchemaMetadata): void {
        this.schemaMetadataList.push(metadata);
    }

    /**
     * Groups metadata by their property names.
     */
    groupByPropertyName(metadata: SchemaMetadata[]): { [propertyName: string]: SchemaMetadata[] } {
        const grouped: { [propertyName: string]: SchemaMetadata[] } = {};
        metadata.forEach((metadata) => {
            if (!grouped[metadata.propertyName]) grouped[metadata.propertyName] = [];
            grouped[metadata.propertyName].push(metadata);
        });
        return grouped;
    }

    /**
     * Gets all validation metadatas for the given object with the given groups.
     */
    getSchemaClassMetadata(sourceClassConstructor: Constructable<any>): SchemaMetadata[] {
        // get directly related to a target metadatas
        const originalMetadatas = this.schemaMetadataList.filter(
            (metadata) => metadata.sourceClass === sourceClassConstructor
        );

        // get metadatas for inherited classes
        const inheritedMetadatas = this.schemaMetadataList.filter(
            (metadata) =>
                metadata.sourceClass !== sourceClassConstructor &&
                sourceClassConstructor.prototype instanceof metadata.sourceClass
        );

        // filter out duplicate metadatas, prefer original metadatas instead of inherited metadatas
        const uniqueInheritedMetadatas = inheritedMetadatas.filter((inheritedMetadata) => {
            return !originalMetadatas.find((originalMetadata) => {
                return (
                    originalMetadata.propertyName === inheritedMetadata.propertyName &&
                    originalMetadata.type === inheritedMetadata.type
                );
            });
        });

        return originalMetadatas.concat(uniqueInheritedMetadatas);
    }
}

/**
 * Gets metadata storage.
 * Metadata storage follows the best practices and stores metadata in a global variable.
 */
export function getMetadataStorage(): MetadataStorage {
    const global = getGlobal();

    if (!global.classValidatorMetadataStorage) {
        global.classValidatorMetadataStorage = new MetadataStorage();
    }

    return global.classValidatorMetadataStorage;
}
