import { ValidationMetadataArgs } from './ValidationMetadataArgs';
import { ValidationArguments } from '../validation/ValidationArguments';
import { Constructable } from '../util/Constructable';
import { SchemaMetadataArgs } from './SchemaMetadataArgs';

/**
 * This metadata contains validation rules.
 */
export class SchemaMetadata {
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

    constructor(args: SchemaMetadataArgs) {
        this.type = args.type;
        this.sourceClass = args.sourceClass;
        this.propertyName = args.propertyName;
        this.constraints = args.constraints;
        this.constraintCls = args.constraintCls;
        this.validationTypeOptions = args.validationTypeOptions;
        if (args.validationOptions) {
            this.context = args.validationOptions.context;
        }
    }
}
