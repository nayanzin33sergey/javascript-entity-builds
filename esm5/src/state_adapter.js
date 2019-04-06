import * as tslib_1 from "tslib";
export var DidMutate;
(function (DidMutate) {
    DidMutate[DidMutate["EntitiesOnly"] = 0] = "EntitiesOnly";
    DidMutate[DidMutate["Both"] = 1] = "Both";
    DidMutate[DidMutate["None"] = 2] = "None";
})(DidMutate || (DidMutate = {}));
export function createStateOperator(mutator) {
    return function operation(arg, state) {
        var clonedEntityState = {
            ids: tslib_1.__spread(state.ids),
            entities: tslib_1.__assign({}, state.entities),
        };
        var didMutate = mutator(arg, clonedEntityState);
        if (didMutate === DidMutate.Both) {
            return Object.assign({}, state, clonedEntityState);
        }
        if (didMutate === DidMutate.EntitiesOnly) {
            return tslib_1.__assign({}, state, { entities: clonedEntityState.entities });
        }
        return state;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NyYy9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLENBQU4sSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLHlEQUFZLENBQUE7SUFDWix5Q0FBSSxDQUFBO0lBQ0oseUNBQUksQ0FBQTtBQUNOLENBQUMsRUFKVyxTQUFTLEtBQVQsU0FBUyxRQUlwQjtBQUtELE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsT0FBNEM7SUFFNUMsT0FBTyxTQUFTLFNBQVMsQ0FBMkIsR0FBTSxFQUFFLEtBQVU7UUFDcEUsSUFBTSxpQkFBaUIsR0FBbUI7WUFDeEMsR0FBRyxtQkFBTSxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ25CLFFBQVEsdUJBQU8sS0FBSyxDQUFDLFFBQVEsQ0FBRTtTQUNoQyxDQUFDO1FBRUYsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRWxELElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDaEMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNwRDtRQUVELElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxZQUFZLEVBQUU7WUFDeEMsNEJBQ0ssS0FBSyxJQUNSLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxRQUFRLElBQ3BDO1NBQ0g7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlTdGF0ZSB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGVudW0gRGlkTXV0YXRlIHtcbiAgRW50aXRpZXNPbmx5LFxuICBCb3RoLFxuICBOb25lLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RhdGVPcGVyYXRvcjxWLCBSPihcbiAgbXV0YXRvcjogKGFyZzogUiwgc3RhdGU6IEVudGl0eVN0YXRlPFY+KSA9PiBEaWRNdXRhdGVcbik6IEVudGl0eVN0YXRlPFY+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0YXRlT3BlcmF0b3I8ViwgUj4oXG4gIG11dGF0b3I6IChhcmc6IGFueSwgc3RhdGU6IGFueSkgPT4gRGlkTXV0YXRlXG4pOiBhbnkge1xuICByZXR1cm4gZnVuY3Rpb24gb3BlcmF0aW9uPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxWPj4oYXJnOiBSLCBzdGF0ZTogYW55KTogUyB7XG4gICAgY29uc3QgY2xvbmVkRW50aXR5U3RhdGU6IEVudGl0eVN0YXRlPFY+ID0ge1xuICAgICAgaWRzOiBbLi4uc3RhdGUuaWRzXSxcbiAgICAgIGVudGl0aWVzOiB7IC4uLnN0YXRlLmVudGl0aWVzIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGRpZE11dGF0ZSA9IG11dGF0b3IoYXJnLCBjbG9uZWRFbnRpdHlTdGF0ZSk7XG5cbiAgICBpZiAoZGlkTXV0YXRlID09PSBEaWRNdXRhdGUuQm90aCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBjbG9uZWRFbnRpdHlTdGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKGRpZE11dGF0ZSA9PT0gRGlkTXV0YXRlLkVudGl0aWVzT25seSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGVudGl0aWVzOiBjbG9uZWRFbnRpdHlTdGF0ZS5lbnRpdGllcyxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9O1xufVxuIl19