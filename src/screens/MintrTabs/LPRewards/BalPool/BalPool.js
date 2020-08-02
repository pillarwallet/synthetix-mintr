import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import snxJSConnector from '../../../../helpers/snxJSConnector';
import { getWalletDetails } from '../../../../ducks/wallet';

import { bigNumberFormatter } from '../../../../helpers/formatters';

import PageContainer from '../../../../components/PageContainer';
import Spinner from '../../../../components/Spinner';

import SetAllowance from './SetAllowance';
import Stake from './Stake';

const UniPool = ({ goBack, walletDetails, stakeContract }) => {
	const [hasAllowance, setAllowance] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { currentWallet } = walletDetails;

	const fetchAllowance = useCallback(async () => {
		if (!snxJSConnector.initialized) return;

		const balpoolContract = snxJSConnector[stakeContract];
		const pool = snxJSConnector.getBalancerPoolContract(await balpoolContract.uni());

		try {
			setIsLoading(true);
			const allowance = await pool.allowance(
				currentWallet,
				balpoolContract.address
			);
			setAllowance(!!bigNumberFormatter(allowance));
			setIsLoading(false);
		} catch (e) {
			console.log(e);
			setIsLoading(false);
			setAllowance(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentWallet, snxJSConnector.initialized]);

	useEffect(() => {
		fetchAllowance();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchAllowance]);

	useEffect(async () => {
		if (!currentWallet) return;

		const balpoolContract = snxJSConnector[stakeContract];
		const pool = snxJSConnector.getBalancerPoolContract(await balpoolContract.uni());

		pool.on('Approval', (owner, spender) => {
			if (owner === currentWallet && spender === balpoolContract.address) {
				setAllowance(true);
			}
		});

		return () => {
			if (snxJSConnector.initialized) {
				pool.removeAllListeners('Approval');
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentWallet]);

	return (
		<PageContainer>
			{isLoading ? (
				<SpinnerContainer>
					<Spinner />
				</SpinnerContainer>
			) : !hasAllowance ? (
				<SetAllowance stakeContract={stakeContract} goBack={goBack} />
			) : (
				<Stake stakeContract={stakeContract} goBack={goBack} />
			)}
		</PageContainer>
	);
};

const SpinnerContainer = styled.div`
	margin: 100px;
`;

const mapStateToProps = state => ({
	walletDetails: getWalletDetails(state),
});

export default connect(mapStateToProps, {})(UniPool);
