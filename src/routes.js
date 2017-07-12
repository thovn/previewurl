import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import Container from './components/route_container';

import PreviewUrl from './components/PreviewUrl';

const componentRoutes = {
	component: Container,
	path: '/',
	indexRoute: { component: PreviewUrl},
	childRoutes: [
	]
}

const Routes = () => {
	return (
		<Router history={browserHistory} routes={componentRoutes} />
	);
};

export default Routes;
