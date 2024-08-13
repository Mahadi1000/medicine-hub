// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";


// store variable is a global variable.
export const makeStore = () => {
    return configureStore({
        reducer: {
           user: userSlice
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
