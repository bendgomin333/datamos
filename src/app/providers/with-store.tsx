import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export const withStore = (Component: React.ComponentType) => () => {
    return (
        <Provider store={store}>
            <Component />
        </Provider>
    )
}