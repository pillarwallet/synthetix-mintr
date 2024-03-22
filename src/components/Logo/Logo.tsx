import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getCurrentTheme } from '../../ducks/ui';

const Logo = ({ className, themeIsDark }: any) => {
	return (
		<Link href="/" className={className}>
			<LogoImg src={`/images/pillar-logo-vector-07.svg`} />
		</Link>
	);
};

const mapStateToProps = (state: any) => ({
	themeIsDark: getCurrentTheme(state),
});

export default connect(mapStateToProps, {})(Logo);

const Link = styled.a`
	width: 120px;
	margin-right: 18px;
`;
const LogoImg = styled.img`
	width: 100%;
`;
