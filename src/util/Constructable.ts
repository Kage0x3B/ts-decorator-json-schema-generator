/**
 * Generic type for class definitions.
 * Example usage:
 * ```
 * function createSomeInstance(myClassDefinition: Constructable<MyClass>) {
 *   return new myClassDefinition()
 * }
 * ```
 */
export interface Constructable<T> extends Function {
    new (...args: any[]): T;
}
