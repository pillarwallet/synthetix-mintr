import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useConnect, useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useEthersSigner } from '../../components/ethers';

import snxJSConnector from '../../helpers/snxJSConnector';

import { setCurrentPage } from '../../ducks/ui';
import { updateWalletStatus, getWalletDetails } from '../../ducks/wallet';
import { getCurrentTheme } from '../../ducks/ui';

import { getEthereumNetwork, onMetamaskAccountChange } from '../../helpers/networkHelper';
import { H1, H2, PMega, ButtonTertiaryLabel } from '../../components/Typography';
import Logo from '../../components/Logo';

import { PAGES_BY_KEY } from '../../constants/ui';
import { ExternalLink } from 'styles/common';

const OnBoardingMessage = () => {
	const { t } = useTranslation();
	return (
		<>
			<OnboardingH1>{t('onboarding.slides.welcome.title')}</OnboardingH1>
			<OnboardingIllustrationContainer>
				<OnboardingIllustration
					style={{ marginTop: '20px', marginBottom: '20px' }}
					src={`/images/ill-rewards.svg`}
				/>
			</OnboardingIllustrationContainer>
			<OnboardingPMega>{t('onboarding.slides.welcome.description')}</OnboardingPMega>
		</>
	);
};

const Landing = ({ currentTheme, walletDetails, updateWalletStatus, setCurrentPage }) => {
	const { t } = useTranslation();

	const {
		connector: selectedConnector,
		isConnected,
		isConnecting,
		address,
		chainId,
	} = useAccount();
	const { error } = useConnect();
	const { disconnect } = useDisconnect();
	const { signMessage, isSuccess, error: signMessageError } = useSignMessage();
	const { open } = useWeb3Modal();

	const signer = useEthersSigner({ chainId });

	useEffect(() => {
		const update = async () => {
			if (error || signMessageError) {
				onWalletStatus({
					walletType: '',
					unlocked: false,
					unlockReason: error || signMessageError,
				});
				if (isConnected) await disconnect();
				return;
			}

			if (!selectedConnector || !isConnected || !signer) return;

			const { name } = await getEthereumNetwork();

			if (!name) {
				onWalletStatus({
					walletType: '',
					unlocked: false,
					unlockReason: 'NetworkNotSupported',
				});
			}

			if (!isSuccess) {
				await signMessage({ message: t('general.modalMessage') });
				return;
			}

			await snxJSConnector.setContractSettings({ networkId: chainId, signer });

			const walletStatus = {
				walletType: selectedConnector.name,
				currentWallet: address,
				unlocked: true,
				networkId: chainId,
				networkName: name.toLowerCase(),
				signer,
			};
			onWalletStatus(walletStatus);
		};
		update();
	}, [selectedConnector, isConnected, error, isConnecting, signer, isSuccess, signMessageError]);

	const onWalletStatus = walletStatus => {
		updateWalletStatus({ ...walletStatus, availableWallets: [] });
		if (walletStatus && walletStatus.unlocked && walletStatus.currentWallet) {
			if (walletStatus.walletType === 'MetaMask') {
				onMetamaskAccountChange(async () => {
					const address = await snxJSConnector.signer.getAddress();
					snxJSConnector.setContractSettings({
						networkId: walletStatus.networkId,
						signer: walletStatus.signer,
					});
					if (address) {
						updateWalletStatus({ currentWallet: address });
					}
				});
			}
			setCurrentPage(PAGES_BY_KEY.MAIN);
		} else setCurrentPage(PAGES_BY_KEY.WALLET_SELECTION);
	};

	return (
		<LandingPageContainer>
			<OnboardingContainer>
				<Header>
					<Logo />
				</Header>
				<OnBoardingMessage />
			</OnboardingContainer>
			<WalletConnectContainer>
				<Wallets>
					<PMega m={'10px 0 20px 0'}>{t('onboarding.walletConnection.title')}</PMega>
					<Button onClick={open}>
						<WalletConnectionH2>{t('button.connectWallet')}</WalletConnectionH2>
					</Button>
				</Wallets>
				<BottomLinks>
					<Link href="https://help.pillarproject.io/en/" target="_blank">
						<ButtonTertiaryLabel>
							<LinkText>{t('button.havingTrouble')}</LinkText>
						</ButtonTertiaryLabel>
					</Link>
					<Link href={`https://pillarproject.io/`} target="_blank">
						<ButtonTertiaryLabel>
							<LinkText>{t('button.whatIsSynthetix')}</LinkText>
						</ButtonTertiaryLabel>
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

const OnboardingIllustrationContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	text-align: center;
`;

const OnboardingIllustration = styled.img`
	width: 232px;
	height: 232px;
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
		transform: translateY(-2px);
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
