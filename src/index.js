import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './config/store';

import './index.css';
import Root from './pages/Root';
import './i18n';
import Web3Providers from './Providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Suspense fallback={<div />}>
		<Provider store={store}>
			<Web3Providers>
				<Root />
			</Web3Providers>
		</Provider>
	</Suspense>
);
