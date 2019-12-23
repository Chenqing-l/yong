import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';

interface Item {
    path: string;
    name: string;
    component: any;
    children?: Array<any>;
}
class RouterMap extends Component<any> {
    render() {
        const { routers, history } = this.props;
        const defaultRoute = <Redirect from="/" to="/login" key={'default'} exact></Redirect>;
        return (
            <Router history={history}>
                <Switch>
                    {routers
                        .map((item: Item, index: number) => {
                            const children = item.children === undefined ? [] : item.children;
                            const Comp = item.component;
                            return (
                                <Route
                                    key={item.name}
                                    path={item.path}
                                    component={() => {
                                        return <Comp routes={children} history={history}></Comp>;
                                    }}
                                />
                            );
                        })
                        .concat([defaultRoute])}
                </Switch>
            </Router>
        );
    }
}

export default RouterMap;
