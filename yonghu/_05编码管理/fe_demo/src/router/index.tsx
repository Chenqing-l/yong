import React from 'react';
import Routermap from './map';
import RouterS from './routers';
function RouterView(props: any) {
    const routers = props.routers === undefined ? RouterS : props.routers;
    return <Routermap routers={routers} {...props}></Routermap>;
}
export default RouterView;
