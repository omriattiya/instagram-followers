import React from 'react';
import './reloadButton.css';

export function ReloadButton({reload, isLoading}) {
    return (
        <button disabled={isLoading} id="reload" onClick={reload}>Reload</button>
    );
}
