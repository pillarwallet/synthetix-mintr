import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import snxJSConnector, { connectToWallet } from '../../helpers/snxJSConnector';

import { setCurrentPage } from '../../ducks/ui';
import { updateWalletStatus, getWalletDetails } from '../../ducks/wallet';
import { getCurrentTheme } from '../../ducks/ui';

import {
	hasWeb3,
	SUPPORTED_WALLETS,
	onMetamaskAccountChange,
	SUPPORTED_WALLETS_MAP,
} from '../../helpers/networkHelper';
import { H1, H2, PMega, ButtonTertiaryLabel } from '../../components/Typography';
import Logo from '../../components/Logo';

import { PAGES_BY_KEY } from '../../constants/ui';
import { ExternalLink } from 'styles/common';

const onWalletClick = ({ wallet, derivationPath, updateWalletStatus, setCurrentPage }) => {
	return async () => {
		const walletStatus = await connectToWallet({ wallet, derivationPath });
		updateWalletStatus({ ...walletStatus, availableWallets: [] });
		if (walletStatus && walletStatus.unlocked && walletStatus.currentWallet) {
			if (walletStatus.walletType === SUPPORTED_WALLETS_MAP.METAMASK) {
				onMetamaskAccountChange(async () => {
					const address = await snxJSConnector.signer.getNextAddresses();
					const signer = new snxJSConnector.signers[SUPPORTED_WALLETS_MAP.METAMASK]({});
					snxJSConnector.setContractSettings({
						networkId: walletStatus.networkId,
						signer,
					});
					if (address && address[0]) {
						updateWalletStatus({ currentWallet: address[0] });
					}
				});
			}
			setCurrentPage(PAGES_BY_KEY.MAIN);
		} else setCurrentPage(PAGES_BY_KEY.WALLET_SELECTION);
	};
};

const OnBoardingCarousel = ({ currentTheme }) => {
	const { t } = useTranslation();
	return (
		<>
			<OnboardingH1>{t('onboarding.slides.welcome.title')}</OnboardingH1>
			<OnboardingPMega>{t('onboarding.slides.welcome.description')}</OnboardingPMega>
			<OnboardingIllustration
				style={{ marginTop: '20px' }}
				src={`/images/onboarding/welcome-${currentTheme ? 'dark' : 'light'}.png`}
			/>
		</>
	);
};

const Landing = ({ currentTheme, walletDetails, updateWalletStatus, setCurrentPage }) => {
	const { t } = useTranslation();

	const { derivationPath } = walletDetails;
	return (
		<LandingPageContainer>
			<OnboardingContainer>
				<Header>
					<Logo />
				</Header>
				<OnBoardingCarousel currentTheme={currentTheme} />
			</OnboardingContainer>
			<WalletConnectContainer>
				<Wallets>
					<PMega m={'10px 0 20px 0'}>{t('onboarding.walletConnection.title')}</PMega>
					{SUPPORTED_WALLETS.map(wallet => {
						const noMetamask = wallet === 'Metamask' && !hasWeb3();
						return (
							<Button
								disabled={noMetamask}
								key={wallet}
								onClick={onWalletClick({
									wallet,
									derivationPath,
									updateWalletStatus,
									setCurrentPage,
								})}
							>
								<Icon src={`images/wallets/${wallet.toLowerCase()}.svg`} />
								<WalletConnectionH2>{wallet}</WalletConnectionH2>
							</Button>
						);
					})}
				</Wallets>
				<BottomLinks>
					<Link href="https://help.pillarproject.io/en/" target="_blank">
						<ButtonTertiaryLabel>
							<LinkText>{t('button.havingTrouble')}</LinkText>
						</ButtonTertiaryLabel>
					</Link>
					<Link href={`https://pillarproject.io/`} target="_blank">
						<ButtonTertiaryLabel><LinkText>{t('button.whatIsSynthetix')}</LinkText></ButtonTertiaryLabel>
					</Link>
					<ExternalLink href={`https://github.com/Synthetixio/synthetix-mintr/`}>
						<VersionLabel>v{process.env.REACT_APP_VERSION} - Forked from Mintr</VersionLabel>
					</ExternalLink>
				</BottomLinks>
			</WalletConnectContainer>
		</LandingPageContainer>
	);
};

const LandingPageContainer = styled.div`
	height: 100vh;
	display: flex;
`;

const OnboardingContainer = styled.div`
	width: 100%;
	padding: 42px;
	background-color: ${props => props.theme.colorStyles.panels};
	border-right: 1px solid ${props => props.theme.colorStyles.borders};
	justify-content: center;
`;

const OnboardingH1 = styled(H1)`
	text-transform: none;
	margin-bottom: 24px;
	text-align: center;
	justify-content: center;
`;

const OnboardingPMega = styled(PMega)`
	margin: 20px auto 0 auto;
	font-size: 18px;
	line-height: 25px;
	width: 100%;
	max-width: 600px;
`;

const OnboardingIllustration = styled.img`
	width: 60vw;
`;

const WalletConnectContainer = styled.div`
	z-index: 100;
	height: 100%;
	max-width: 500px;
	padding: 32px;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: ${props => props.theme.colorStyles.background};
`;

const Wallets = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

const Button = styled.button`
	height: 80px;
	width: 100%;
	padding: 16px 48px;
	margin: 10px 0;
	display: flex;
	justify-content: left;
	align-items: center;
	background-color: ${props => props.theme.colorStyles.panelButton};
	border-radius: 6px;
	border-style: none;
	box-shadow: 0px 0px 0px 0px ${props => props.theme.colorStyles.shadow1};
	opacity: ${props => (props.disabled ? '0.4' : 1)};
	cursor: pointer;
	transition: all 0.1s ease;
	:hover {
		background-color: ${props => props.theme.colorStyles.panelButtonHover};
	}
`;

const WalletConnectionH2 = styled(H2)`
	text-transform: capitalize;
	margin: 0;
	font-size: 18px;
	color: ${props => props.theme.colorStyles.panels};
`;

const Icon = styled.img`
	width: 40px;
	height: 40px;
	margin-right: 24px;
`;

const LinkText = styled.span`
	color: ${props => props.theme.colorStyles.panels};
	font-size: 16px;
`;

const Link = styled.a`
	background-color: ${props => props.theme.colorStyles.buttonPrimaryBg};
	border: 0px solid ${props => props.theme.colorStyles.borders};
	text-transform: none;
	font-size: 32px;
	text-decoration: none;
	width: 300px;
	cursor: pointer;
	height: 50px;
	border-radius: 6px;
	margin: 10px 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const BottomLinks = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Header = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const VersionLabel = styled.div`
	text-align: right;
	font-size: 12px;
	margin-top: 5px;
	color: ${props => props.theme.colorStyles.body};
	text-decoration: underline;
`;

const mapStateToProps = state => ({
	currentTheme: getCurrentTheme(state),
	walletDetails: getWalletDetails(state),
});

const mapDispatchToProps = {
	setCurrentPage,
	updateWalletStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
