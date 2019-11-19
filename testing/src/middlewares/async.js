export default ({ dispatch }) => next => action => {
    // Check to see if the action has a promise on it's payload property
    // Wait to resolve if promise
    // If not send to the next middleware
    if (!action.payload || !action.payload.then) {
        return next(action);
    }
    action.payload.then(function(response) {
        const newAction = { ...action, payload: response };
        dispatch(newAction);
    });
};

