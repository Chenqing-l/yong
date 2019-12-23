import React, { Component } from 'react';
import Loading from 'react-loadable';
const LOADING = () => {
    return <div>loading...</div>;
};
export default (loader: any, loading = LOADING) => {
    return Loading({
        loader,
        loading,
    });
};
