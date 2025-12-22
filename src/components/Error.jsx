import React from 'react';
import { useRouteError } from 'react-router-dom';

function Error() {
    const err= useRouteError();
    console.log("error", err)
    return (
        <div>
            <h1>OOPS!</h1>
            <h2>Something went wrong</h2>
            <h3>{err.status} - {err.data}</h3>
        </div>
    )
}

export default Error