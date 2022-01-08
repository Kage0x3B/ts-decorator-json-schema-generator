// noinspection JSMismatchedCollectionQueryUpdate

import { SchemaMetadata, SchemaMetadataOptions, SchemaMetadataValue } from './SchemaMetadata';
import { propertyNameListKey, schemaMetadataListKey, typeMetadataKey } from './MetadataKeys';
import { Constructable } from '../util/Constructable';
import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';

export type TypeMetadata = { typeName: JSONSchema7TypeName | JSONSchema7TypeName[]; typeClass?: Constructable<any> };

export function applySchemaMetadata(options: SchemaMetadataOptions) {
    return applySchemaMetadataList(new SchemaMetadata(options));
}

export function applyPropertySchemaMetadata<
    TKey extends keyof JSONSchema7,
    TValue extends NonNullable<JSONSchema7[TKey]>
>(type: TKey, value: TValue) {
    return applySchemaMetadataList(
        new SchemaMetadata({
            type,
            value: value as unknown as SchemaMetadataValue
        })
    );
}

export function applyCustomTypeMetadata(typeMetadata: TypeMetadata) {
    return (target: any, propertyKey: string) => {
        Reflect.defineMetadata(typeMetadataKey, typeMetadata, target, propertyKey);
    };
}

export function applySchemaMetadataList(...metadataList: SchemaMetadata[]) {
    return (target: any, propertyKey?: string) => {
        appendMetadataList(schemaMetadataListKey, metadataList, target, propertyKey);

        if (propertyKey) {
            appendMetadataList(propertyNameListKey, [propertyKey], target);
        }
    };
}

export function applySchemaMetadataClass(options: SchemaMetadataOptions) {
    return applySchemaMetadataListClass(new SchemaMetadata(options));
}

export function applySchemaMetadataListClass(...metadataList: SchemaMetadata[]) {
    return (target: Constructable<any>) => {
        appendMetadataList(schemaMetadataListKey, metadataList, target.prototype);
    };
}

// eslint-disable-next-line @typescript-eslint/ban-types
function appendMetadataList<T>(metadataKey: any, metadataList: T[], target: Object, propertyKey?: string | symbol) {
    if (propertyKey) {
        const schemaMetadataList: Set<T> = Reflect.getMetadata(metadataKey, target, propertyKey);

        if (schemaMetadataList) {
            metadataList.forEach((m) => schemaMetadataList.add(m));
        } else {
            Reflect.defineMetadata(metadataKey, new Set(metadataList), target, propertyKey);
        }
    } else {
        const schemaMetadataList: Set<T> = Reflect.getMetadata(metadataKey, target);

        if (schemaMetadataList) {
            metadataList.forEach((m) => schemaMetadataList.add(m));
        } else {
            Reflect.defineMetadata(metadataKey, new Set(metadataList), target);
        }
    }
}
