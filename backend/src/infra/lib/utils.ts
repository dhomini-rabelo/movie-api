import { AnyRecord } from "@typings/utils";

export function removeKeysForUndefinedValues(obj: AnyRecord): AnyRecord {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}