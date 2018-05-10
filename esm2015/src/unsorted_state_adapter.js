/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { createStateOperator, DidMutate } from './state_adapter';
/**
 * @template T
 * @param {?} selectId
 * @return {?}
 */
export function createUnsortedStateAdapter(selectId) {
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function addOneMutably(entity, state) {
        const /** @type {?} */ key = selectId(entity);
        if (key in state.entities) {
            return DidMutate.None;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return DidMutate.Both;
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(entities, state) {
        let /** @type {?} */ didMutate = false;
        for (const /** @type {?} */ entity of entities) {
            didMutate = addOneMutably(entity, state) !== DidMutate.None || didMutate;
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function addAllMutably(entities, state) {
        state.ids = [];
        state.entities = {};
        addManyMutably(entities, state);
        return DidMutate.Both;
    }
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    function removeOneMutably(key, state) {
        return removeManyMutably([key], state);
    }
    /**
     * @param {?} keys
     * @param {?} state
     * @return {?}
     */
    function removeManyMutably(keys, state) {
        const /** @type {?} */ didMutate = keys
            .filter(key => key in state.entities)
            .map(key => delete state.entities[key]).length > 0;
        if (didMutate) {
            state.ids = state.ids.filter((id) => id in state.entities);
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    /**
     * @template S
     * @param {?} state
     * @return {?}
     */
    function removeAll(state) {
        return Object.assign({}, state, {
            ids: [],
            entities: {},
        });
    }
    /**
     * @param {?} keys
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function takeNewKey(keys, update, state) {
        const /** @type {?} */ original = state.entities[update.id];
        const /** @type {?} */ updated = Object.assign({}, original, update.changes);
        const /** @type {?} */ newKey = selectId(updated);
        const /** @type {?} */ hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
    }
    /**
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    /**
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        const /** @type {?} */ newKeys = {};
        updates = updates.filter(update => update.id in state.entities);
        const /** @type {?} */ didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            const /** @type {?} */ didMutateIds = updates.filter(update => takeNewKey(newKeys, update, state)).length > 0;
            if (didMutateIds) {
                state.ids = state.ids.map((id) => newKeys[id] || id);
                return DidMutate.Both;
            }
            else {
                return DidMutate.EntitiesOnly;
            }
        }
        return DidMutate.None;
    }
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function upsertManyMutably(entities, state) {
        const /** @type {?} */ added = [];
        const /** @type {?} */ updated = [];
        for (const /** @type {?} */ entity of entities) {
            const /** @type {?} */ id = selectId(entity);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            }
            else {
                added.push(entity);
            }
        }
        const /** @type {?} */ didMutateByUpdated = updateManyMutably(updated, state);
        const /** @type {?} */ didMutateByAdded = addManyMutably(added, state);
        switch (true) {
            case didMutateByAdded === DidMutate.None &&
                didMutateByUpdated === DidMutate.None:
                return DidMutate.None;
            case didMutateByAdded === DidMutate.Both ||
                didMutateByUpdated === DidMutate.Both:
                return DidMutate.Both;
            default:
                return DidMutate.EntitiesOnly;
        }
    }
    return {
        removeAll,
        addOne: createStateOperator(addOneMutably),
        addMany: createStateOperator(addManyMutably),
        addAll: createStateOperator(addAllMutably),
        updateOne: createStateOperator(updateOneMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        removeOne: createStateOperator(removeOneMutably),
        removeMany: createStateOperator(removeManyMutably),
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zb3J0ZWRfc3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NyYy91bnNvcnRlZF9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztBQUtqRSxNQUFNLHFDQUF3QyxRQUF1Qjs7Ozs7O0lBSW5FLHVCQUF1QixNQUFXLEVBQUUsS0FBVTtRQUM1Qyx1QkFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztTQUN2QjtRQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBRTdCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0tBQ3ZCOzs7Ozs7SUFHRCx3QkFBd0IsUUFBZSxFQUFFLEtBQVU7UUFDakQscUJBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV0QixHQUFHLENBQUMsQ0FBQyx1QkFBTSxNQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM5QixTQUFTLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQztTQUMxRTtRQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7S0FDcEQ7Ozs7OztJQUdELHVCQUF1QixRQUFlLEVB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LCBFbnRpdHlTdGF0ZUFkYXB0ZXIsIElkU2VsZWN0b3IsIFVwZGF0ZSB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGNyZWF0ZVN0YXRlT3BlcmF0b3IsIERpZE11dGF0ZSB9IGZyb20gJy4vc3RhdGVfYWRhcHRlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVbnNvcnRlZFN0YXRlQWRhcHRlcjxUPihcbiAgc2VsZWN0SWQ6IElkU2VsZWN0b3I8VD5cbik6IEVudGl0eVN0YXRlQWRhcHRlcjxUPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVbnNvcnRlZFN0YXRlQWRhcHRlcjxUPihzZWxlY3RJZDogSWRTZWxlY3RvcjxUPik6IGFueSB7XG4gIHR5cGUgUiA9IEVudGl0eVN0YXRlPFQ+O1xuXG4gIGZ1bmN0aW9uIGFkZE9uZU11dGFibHkoZW50aXR5OiBULCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gYWRkT25lTXV0YWJseShlbnRpdHk6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3Qga2V5ID0gc2VsZWN0SWQoZW50aXR5KTtcblxuICAgIGlmIChrZXkgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICB9XG5cbiAgICBzdGF0ZS5pZHMucHVzaChrZXkpO1xuICAgIHN0YXRlLmVudGl0aWVzW2tleV0gPSBlbnRpdHk7XG5cbiAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRNYW55TXV0YWJseShlbnRpdGllczogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gYWRkTWFueU11dGFibHkoZW50aXRpZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBsZXQgZGlkTXV0YXRlID0gZmFsc2U7XG5cbiAgICBmb3IgKGNvbnN0IGVudGl0eSBvZiBlbnRpdGllcykge1xuICAgICAgZGlkTXV0YXRlID0gYWRkT25lTXV0YWJseShlbnRpdHksIHN0YXRlKSAhPT0gRGlkTXV0YXRlLk5vbmUgfHwgZGlkTXV0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiBkaWRNdXRhdGUgPyBEaWRNdXRhdGUuQm90aCA6IERpZE11dGF0ZS5Ob25lO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQWxsTXV0YWJseShlbnRpdGllczogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gYWRkQWxsTXV0YWJseShlbnRpdGllczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHN0YXRlLmlkcyA9IFtdO1xuICAgIHN0YXRlLmVudGl0aWVzID0ge307XG5cbiAgICBhZGRNYW55TXV0YWJseShlbnRpdGllcywgc3RhdGUpO1xuXG4gICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlT25lTXV0YWJseShrZXk6IFQsIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiByZW1vdmVPbmVNdXRhYmx5KGtleTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICByZXR1cm4gcmVtb3ZlTWFueU11dGFibHkoW2tleV0sIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU1hbnlNdXRhYmx5KGtleXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHJlbW92ZU1hbnlNdXRhYmx5KGtleXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBkaWRNdXRhdGUgPVxuICAgICAga2V5c1xuICAgICAgICAuZmlsdGVyKGtleSA9PiBrZXkgaW4gc3RhdGUuZW50aXRpZXMpXG4gICAgICAgIC5tYXAoa2V5ID0+IGRlbGV0ZSBzdGF0ZS5lbnRpdGllc1trZXldKS5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGRpZE11dGF0ZSkge1xuICAgICAgc3RhdGUuaWRzID0gc3RhdGUuaWRzLmZpbHRlcigoaWQ6IGFueSkgPT4gaWQgaW4gc3RhdGUuZW50aXRpZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBkaWRNdXRhdGUgPyBEaWRNdXRhdGUuQm90aCA6IERpZE11dGF0ZS5Ob25lO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQWxsPFMgZXh0ZW5kcyBSPihzdGF0ZTogUyk6IFM7XG4gIGZ1bmN0aW9uIHJlbW92ZUFsbDxTIGV4dGVuZHMgUj4oc3RhdGU6IGFueSk6IFMge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgaWRzOiBbXSxcbiAgICAgIGVudGl0aWVzOiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRha2VOZXdLZXkoXG4gICAga2V5czogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9LFxuICAgIHVwZGF0ZTogVXBkYXRlPFQ+LFxuICAgIHN0YXRlOiBSXG4gICk6IHZvaWQ7XG4gIGZ1bmN0aW9uIHRha2VOZXdLZXkoXG4gICAga2V5czogeyBbaWQ6IHN0cmluZ106IGFueSB9LFxuICAgIHVwZGF0ZTogVXBkYXRlPFQ+LFxuICAgIHN0YXRlOiBhbnlcbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgb3JpZ2luYWwgPSBzdGF0ZS5lbnRpdGllc1t1cGRhdGUuaWRdO1xuICAgIGNvbnN0IHVwZGF0ZWQ6IFQgPSBPYmplY3QuYXNzaWduKHt9LCBvcmlnaW5hbCwgdXBkYXRlLmNoYW5nZXMpO1xuICAgIGNvbnN0IG5ld0tleSA9IHNlbGVjdElkKHVwZGF0ZWQpO1xuICAgIGNvbnN0IGhhc05ld0tleSA9IG5ld0tleSAhPT0gdXBkYXRlLmlkO1xuXG4gICAgaWYgKGhhc05ld0tleSkge1xuICAgICAga2V5c1t1cGRhdGUuaWRdID0gbmV3S2V5O1xuICAgICAgZGVsZXRlIHN0YXRlLmVudGl0aWVzW3VwZGF0ZS5pZF07XG4gICAgfVxuXG4gICAgc3RhdGUuZW50aXRpZXNbbmV3S2V5XSA9IHVwZGF0ZWQ7XG5cbiAgICByZXR1cm4gaGFzTmV3S2V5O1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlT25lTXV0YWJseSh1cGRhdGU6IFVwZGF0ZTxUPiwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwZGF0ZU9uZU11dGFibHkodXBkYXRlOiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiB1cGRhdGVNYW55TXV0YWJseShbdXBkYXRlXSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFueU11dGFibHkodXBkYXRlczogVXBkYXRlPFQ+W10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgbmV3S2V5czogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgICB1cGRhdGVzID0gdXBkYXRlcy5maWx0ZXIodXBkYXRlID0+IHVwZGF0ZS5pZCBpbiBzdGF0ZS5lbnRpdGllcyk7XG5cbiAgICBjb25zdCBkaWRNdXRhdGVFbnRpdGllcyA9IHVwZGF0ZXMubGVuZ3RoID4gMDtcblxuICAgIGlmIChkaWRNdXRhdGVFbnRpdGllcykge1xuICAgICAgY29uc3QgZGlkTXV0YXRlSWRzID1cbiAgICAgICAgdXBkYXRlcy5maWx0ZXIodXBkYXRlID0+IHRha2VOZXdLZXkobmV3S2V5cywgdXBkYXRlLCBzdGF0ZSkpLmxlbmd0aCA+IDA7XG5cbiAgICAgIGlmIChkaWRNdXRhdGVJZHMpIHtcbiAgICAgICAgc3RhdGUuaWRzID0gc3RhdGUuaWRzLm1hcCgoaWQ6IGFueSkgPT4gbmV3S2V5c1tpZF0gfHwgaWQpO1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gIH1cblxuICBmdW5jdGlvbiB1cHNlcnRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiB1cHNlcnRNYW55TXV0YWJseShbZW50aXR5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBzZXJ0TWFueU11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE1hbnlNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgYWRkZWQ6IGFueVtdID0gW107XG4gICAgY29uc3QgdXBkYXRlZDogYW55W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGVudGl0aWVzKSB7XG4gICAgICBjb25zdCBpZCA9IHNlbGVjdElkKGVudGl0eSk7XG4gICAgICBpZiAoaWQgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgICAgdXBkYXRlZC5wdXNoKHsgaWQsIGNoYW5nZXM6IGVudGl0eSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZGVkLnB1c2goZW50aXR5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaWRNdXRhdGVCeVVwZGF0ZWQgPSB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVkLCBzdGF0ZSk7XG4gICAgY29uc3QgZGlkTXV0YXRlQnlBZGRlZCA9IGFkZE1hbnlNdXRhYmx5KGFkZGVkLCBzdGF0ZSk7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgZGlkTXV0YXRlQnlBZGRlZCA9PT0gRGlkTXV0YXRlLk5vbmUgJiZcbiAgICAgICAgZGlkTXV0YXRlQnlVcGRhdGVkID09PSBEaWRNdXRhdGUuTm9uZTpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgICAgY2FzZSBkaWRNdXRhdGVCeUFkZGVkID09PSBEaWRNdXRhdGUuQm90aCB8fFxuICAgICAgICBkaWRNdXRhdGVCeVVwZGF0ZWQgPT09IERpZE11dGF0ZS5Cb3RoOlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbW92ZUFsbCxcbiAgICBhZGRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IoYWRkT25lTXV0YWJseSksXG4gICAgYWRkTWFueTogY3JlYXRlU3RhdGVPcGVyYXRvcihhZGRNYW55TXV0YWJseSksXG4gICAgYWRkQWxsOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKGFkZEFsbE11dGFibHkpLFxuICAgIHVwZGF0ZU9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cGRhdGVPbmVNdXRhYmx5KSxcbiAgICB1cGRhdGVNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwZGF0ZU1hbnlNdXRhYmx5KSxcbiAgICB1cHNlcnRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBzZXJ0T25lTXV0YWJseSksXG4gICAgdXBzZXJ0TWFueTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cHNlcnRNYW55TXV0YWJseSksXG4gICAgcmVtb3ZlT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHJlbW92ZU9uZU11dGFibHkpLFxuICAgIHJlbW92ZU1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IocmVtb3ZlTWFueU11dGFibHkpLFxuICB9O1xufVxuIl19