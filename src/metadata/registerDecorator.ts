import { getMetadataStorage } from './MetadataStorage';
import { SchemaMetadata } from './SchemaMetadata';

export interface ValidationDecoratorOptions {
    /**
     * Target object to be validated.
     */
    target: Function;

    /**
     * Target object's property name to be validated.
     */
    propertyName: string;

    /**
     * Name of the validation that is being registered.
     */
    name?: string;

    /**
     * Indicates if this decorator will perform async validation.
     */
    async?: boolean;

    /**
     * Validator options.
     */
    options?: ValidationOptions;

    /**
     * Array of validation constraints.
     */
    constraints?: any[];

    /**
     * Validator that performs validation.
     */
    validator: ValidatorConstraintInterface | Function;
}

/**
 * Registers a custom validation decorator.
 */
export function registerDecorator(options: ValidationDecoratorOptions): void {
    const validationMetadataArgs: ValidationMetadataArgs = {
        type: options.name && ValidationTypes.isValid(options.name) ? options.name : ValidationTypes.CUSTOM_VALIDATION,
        target: options.target,
        propertyName: options.propertyName,
        validationOptions: options.options,
        constraints: options.constraints
    };
    getMetadataStorage().addSchemaMetadata(new SchemaMetadata(validationMetadataArgs));
}
