import { Constructable } from './util/Constructable';
import { JSONSchema7 } from 'json-schema';
import { propertyNameListKey, SchemaMetadata, schemaMetadataListKey, TypeMetadata, typeMetadataKey } from './decorator';
import { hasSuperClass, parseTypeName } from './util/util';

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

    const propertyList: Set<string> = Reflect.getOwnMetadata(propertyNameListKey, classPrototype);

    applyMetadata(depth, schema, classPrototype);

    if (propertyList) {
        schema.properties = {};

        for (const propertyKey of propertyList) {
            const propertySchema: JSONSchema7 = {};

            applyMetadata(depth, propertySchema, classPrototype, schema, propertyKey);

            schema.properties[propertyKey] = propertySchema;
        }
    }

    if (hasSuperClass(classPrototype)) {
        const superClassSchema = generateObjectSchema(Object.getPrototypeOf(classPrototype));

        applySuperClassSchema(schema, superClassSchema);
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

        if (typeName === 'object' && typeClass && typeClass.prototype) {
            if (typeClass === Object) {
                throw new Error(
                    `Unknown type on property called '${propertyKey}', please manually use the @Type decorator on it.`
                );
            }

            Object.assign(schema, generateObjectSchema(typeClass.prototype, generatorDepth + 1));
        }
    }

    const propertyMetadataList: Set<SchemaMetadata> = propertyKey
        ? Reflect.getOwnMetadata(schemaMetadataListKey, classPrototype, propertyKey)
        : Reflect.getOwnMetadata(schemaMetadataListKey, classPrototype);

    if (propertyMetadataList) {
        for (const schemaMetadata of propertyMetadataList) {
            schemaMetadata.apply(schema);

            if (parentSchema && propertyKey) {
                schemaMetadata.applyToParent(parentSchema, propertyKey);
            }
        }
    }
}

function extractTypeProperty(classPrototype: any, propertyKey: string): TypeMetadata {
    const typeMetadata: Constructable<any> = Reflect.getOwnMetadata('design:type', classPrototype, propertyKey);
    const customTypeMetadata: TypeMetadata | undefined = Reflect.getOwnMetadata(
        typeMetadataKey,
        classPrototype,
        propertyKey
    );

    if (customTypeMetadata) {
        return customTypeMetadata;
    } else {
        return {
            typeName: parseTypeName(typeMetadata),
            typeClass: typeMetadata
        };
    }
}

function applySuperClassSchema(schema: JSONSchema7, superClassSchema: JSONSchema7) {
    schema.properties = {
        ...superClassSchema.properties,
        ...schema.properties
    };

    if (superClassSchema.required && superClassSchema.required.length) {
        schema.required = [...superClassSchema.required, ...(schema.required ? schema.required : [])];
    }

    if (superClassSchema.dependencies) {
        Object.assign(schema.dependencies, superClassSchema.dependencies);
    }
}
