import { JSONSchema7TypeName } from 'json-schema';

// eslint-disable-next-line @typescript-eslint/ban-types
export function hasOwnProperty<X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop);
}

export function parseTypeName(type: any): JSONSchema7TypeName {
    if (type === String) {
        return 'string';
    } else if (type === Number) {
        return 'number';
    } else if (type === Boolean) {
        return 'boolean';
    } else if (type === Object) {
        return 'object';
    } else if (type === Array) {
        return 'array';
    } else if (typeof type === 'undefined') {
        return 'null';
    }

    return 'object';
}

export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

export function enumValues<O extends object>(obj: O): O[keyof O][] {
    return enumKeys(obj).map((key) => obj[key]);
}

export function hasSuperClass(classPrototype: any) {
    return Object.getPrototypeOf(classPrototype) !== Object.prototype;
}
