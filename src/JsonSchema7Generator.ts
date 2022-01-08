import { Constructable } from './util/Constructable';
import { JSONSchema7, JSONSchema7Object } from 'json-schema';

export class JsonSchemaGenerator {
    private sourceClass: Constructable<any>;

    constructor(sourceClass: Constructable<any>) {
        this.sourceClass = sourceClass;
    }

    public generateJsonSchema(): JSONSchema7 {
        return {};
    }

    public generateObjectSchema(): JSONSchema7Object {
        return {};
    }
}

export function generateJsonSchema(sourceClass: Constructable<any>): JSONSchema7 {
    const schemaGenerator = new JsonSchemaGenerator(sourceClass);

    return schemaGenerator.generateJsonSchema();
}
