import React from 'react';
import styled from 'styled-components';

import { formatCurrency } from '../../../helpers/formatters';

import { SlidePage } from '../../../components/Slider';
import { ButtonTertiary } from '../../../components/Button';
import {
  PLarge,
  PageTitle,
  DataHeaderLarge,
  Subtext,
} from '../../../components/Typography';
import Spinner from '../../../components/Spinner';

const Confirmation = ({ goBack, walletType, feesAvailable }) => {
  return (
    <SlidePage>
      <Container>
        <Navigation>
          <ButtonTertiary onClick={() => goBack(1)}>Go back</ButtonTertiary>
        </Navigation>
        <Top>
          <Intro>
            <ActionImage
              src={`/images/wallets/${walletType.toLowerCase()}.svg`}
              big
            />
            <PageTitle>Please confirm transaction</PageTitle>
            <PLarge>
              {`To continue, follow the prompts on your ${walletType} Wallet.`}
            </PLarge>
          </Intro>
          <Details>
            <Box>
              <DataHeaderLarge>CLAIMING:</DataHeaderLarge>
              <Amount>
                {feesAvailable && feesAvailable[0]
                  ? formatCurrency(feesAvailable[0])
                  : 0}{' '}
                sUSD
              </Amount>
            </Box>
            <Box>
              <DataHeaderLarge>CLAIMING:</DataHeaderLarge>
              <Amount>
                {feesAvailable && feesAvailable[1]
                  ? formatCurrency(feesAvailable[1])
                  : 0}{' '}
                SNX
              </Amount>
            </Box>
          </Details>
        </Top>
        <Loading>
          <Spinner margin='auto' />
          <Subtext>Waiting for user response...</Subtext>
        </Loading>
        <Bottom>
          <Fees>
            <Subtext>Ethereum network fees (Gas): $0.083 </Subtext>
            <Subtext>Estimated transaction speed: ~5.24 mins</Subtext>
          </Fees>
        </Bottom>
      </Container>
    </SlidePage>
  );
};

const Container = styled.div`
  width: 100%;
  height: 850px;
  max-width: 720px;
  margin: 0 auto;
  overflow: hidden;
  background-color: ${props => props.theme.colorStyles.panels};
  border: 1px solid ${props => props.theme.colorStyles.borders};
  border-radius: 5px;
  box-shadow: 0px 5px 10px 5px ${props => props.theme.colorStyles.shadow1};
  margin-bottom: 20px;
  padding: 48px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
`;

const Navigation = styled.div`
  width: 100%;
  display: flex;
  text-align: left;
`;

const Top = styled.div`
  height: auto;
`;

const Bottom = styled.div`
  height: auto;
  margin-bottom: 48px;
`;

const Intro = styled.div`
  max-width: 450px;
  margin: 0px auto 48px auto;
`;

const ActionImage = styled.img`
  height: ${props => (props.big ? '64px' : '48px')};
  width: ${props => (props.big ? '64px' : '48px')};
  margin-bottom: 16px;
`;

const Details = styled.div`
  display: flex;
`;

const Box = styled.div`
  height: auto;
  width: auto;
  padding: 24px 40px;
  margin: 0px 16px;
  border: 1px solid ${props => props.theme.colorStyles.borders};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;

const Amount = styled.span`
  color: ${props => props.theme.colorStyles.hyperlink};
  font-family: 'apercu-medium';
  font-size: 24px;
  margin: 16px 0px 0px 0px;
`;

const Fees = styled.div`
  height: auto;
`;

const Loading = styled.div`
  align-items: center;
`;

export default Confirmation;