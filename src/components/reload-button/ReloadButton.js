import React from 'react';
import Loader from "react-loader-spinner";
import './reloadButton.css';

export function ReloadButton({reload, isLoading}) {
    return (
        <button disabled={isLoading} id="reload" onClick={reload}>
            {isLoading ?
                (
                    <Loader width={20} height={20} type="Oval" color="#00BFFF"/>
                ) : (
                    <>Reload</>
                )
            }
        </button>);
}
