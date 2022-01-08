import 'reflect-metadata';
import { Constructable } from './util/Constructable';
import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import { propertyNameListKey, SchemaMetadata, schemaMetadataListKey } from './decorator';
import { parseTypeName } from './util/util';

export function generateJsonSchema(sourceClass: Constructable<any>): JSONSchema7 {
    return generateObjectSchema(sourceClass.prototype);
}

export function generateObjectSchema(classPrototype: any, depth = 0): JSONSchema7 {
    const schema: JSONSchema7 = {
        type: 'object'
    };

    if (depth === 0) {
        schema.$schema = 'https://json-schema.org/draft-07/schema';
    }

    const propertyList: Set<string> = Reflect.getMetadata(propertyNameListKey, classPrototype);

    applyMetadata(depth, schema, classPrototype);

    if (propertyList) {
        schema.properties = {};

        for (const propertyKey of propertyList) {
            const propertySchema: JSONSchema7 = {};

            applyMetadata(depth, propertySchema, classPrototype, schema, propertyKey);

            schema.properties[propertyKey] = propertySchema;
        }
    }

    return schema;
}

function applyMetadata(
    generatorDepth: number,
    schema: JSONSchema7,
    classPrototype: any,
    parentSchema?: JSONSchema7,
    propertyKey?: string
) {
    if (propertyKey) {
        const { typeName, typeClass } = extractTypeProperty(classPrototype, propertyKey);
        schema.type = typeName;

        if (typeName === 'object') {
            schema = {
                ...schema,
                ...generateObjectSchema(typeClass.prototype, generatorDepth + 1)
            };
        }
    }

    const propertyMetadataList: Set<SchemaMetadata> = propertyKey
        ? Reflect.getMetadata(schemaMetadataListKey, classPrototype, propertyKey)
        : Reflect.getMetadata(schemaMetadataListKey, classPrototype);

    if (propertyMetadataList) {
        for (const schemaMetadata of propertyMetadataList) {
            schemaMetadata.apply(schema);

            if (parentSchema && propertyKey) {
                schemaMetadata.applyToParent(parentSchema, propertyKey);
            }
        }
    }
}

function extractTypeProperty(
    classPrototype: any,
    propertyKey: string
): { typeName: JSONSchema7TypeName; typeClass: Constructable<any> } {
    const typeMetadata: Constructable<any> = Reflect.getMetadata('design:type', classPrototype, propertyKey);

    return {
        typeName: parseTypeName(typeMetadata),
        typeClass: typeMetadata
    };
}
