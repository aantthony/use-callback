# use-callback

`React.useCallback` but without the argument lists.

The `React.useCallback` argument list makes sense when the function identity changes. For example if a `filter` prop accepts a function argument, that should be re-executed every time a 'new' filter is created. But for a callback, the behaviour of a child component should not change depending on its callback -- it just needs to execute 'the' callback (which has no identity).

This hook is created for that purpose. Use 'use-callback' for callbacks, and `React.useCallback` for functions where the return result is used by a component.