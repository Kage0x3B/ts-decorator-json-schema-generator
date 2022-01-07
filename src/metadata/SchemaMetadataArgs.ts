/**
 * Constructor arguments for SchemaMetadata class.
 */
import { Constructable } from '../util/Constructable';

export interface SchemaMetadataArgs {
    /**
     * Metadata type.
     */
    type: string;

    /**
     * Source class from which the schema will be generated.
     */
    sourceClass: Constructable<any>;

    /**
     * Property name of the object.
     */
    propertyName: string;
}
