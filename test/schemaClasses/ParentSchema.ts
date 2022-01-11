import { Required } from '../../src';

export abstract class ParentSchema {
    @Required()
    public parentProperty!: string;

    protected constructor(parentProperty: string) {
        this.parentProperty = parentProperty;
    }
}
