export function getInitialEntityState() {
    return {
        ids: [],
        entities: {},
    };
}
export function createInitialStateFactory() {
    function getInitialState(additionalState = {}) {
        return Object.assign(getInitialEntityState(), additionalState);
    }
    return { getInitialState };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5X3N0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL2VudGl0eV9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLE9BQU87UUFDTCxHQUFHLEVBQUUsRUFBRTtRQUNQLFFBQVEsRUFBRSxFQUFFO0tBQ2IsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUseUJBQXlCO0lBS3ZDLFNBQVMsZUFBZSxDQUFDLGtCQUF1QixFQUFFO1FBQ2hELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUM7QUFDN0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVN0YXRlIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5pdGlhbEVudGl0eVN0YXRlPFY+KCk6IEVudGl0eVN0YXRlPFY+IHtcbiAgcmV0dXJuIHtcbiAgICBpZHM6IFtdLFxuICAgIGVudGl0aWVzOiB7fSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluaXRpYWxTdGF0ZUZhY3Rvcnk8Vj4oKSB7XG4gIGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpOiBFbnRpdHlTdGF0ZTxWPjtcbiAgZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlPFMgZXh0ZW5kcyBvYmplY3Q+KFxuICAgIGFkZGl0aW9uYWxTdGF0ZTogU1xuICApOiBFbnRpdHlTdGF0ZTxWPiAmIFM7XG4gIGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZShhZGRpdGlvbmFsU3RhdGU6IGFueSA9IHt9KTogYW55IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihnZXRJbml0aWFsRW50aXR5U3RhdGUoKSwgYWRkaXRpb25hbFN0YXRlKTtcbiAgfVxuXG4gIHJldHVybiB7IGdldEluaXRpYWxTdGF0ZSB9O1xufVxuIl19