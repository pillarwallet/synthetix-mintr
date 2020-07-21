import React, { FC } from 'react';
import styled from 'styled-components';

import Dashboard from 'screens/Dashboard';
import MintrPanel from 'screens/MintrPanel';

const Main: FC = () => (
	<MainWrapper>
		<MintrPanel />
	</MainWrapper>
);

const MainWrapper = styled.div`
	display: flex;
	width: 100%;
`;

export default Main;
