import React, {createContext} from "react";

    const contextDefaultValue = {
        redirectPath: undefined
    }

    const Context = createContext(contextDefaultValue)

    export default Context
