import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function navigate({ routeName, params, action, ...args }) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      action,
      ...args,
    }),
  );
}

export function reset({ routeName, params, action, ...args }) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName,
        params,
        action,
        ...args,
      }),
    ],
  });
  _navigator.dispatch(resetAction);
}
