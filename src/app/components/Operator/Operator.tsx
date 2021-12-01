import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import Layout from '~app/common/components/Layout';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import ContentContainer from '~app/common/components/ContentContainer';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import BreadCrumbs from '~app/components/Operator/components/BreadCrumbs';
import ValidatorsInOperatorTable from '~app/components/Operator/components/Operator/ValidatorsInOperatorTable';
import {
  OperatorName,
  OperatorInfo,
  OperatorMetadata,
  OperatorDescription,
  OperatorSocialNetworks,
} from '~app/components/Operator/components/Operator/Partials';

const Operator = () => {
  // Params
  const params: any = useParams();

  // Loading indicators
  const [loadingOperator, setLoadingOperator] = useState(false);
  const [loadingValidators, setLoadingValidators] = useState(false);

  // Operator
  const defaultOperator: Record<string, any> = {};
  const [operator, setOperator] = useState(defaultOperator);

  // Validators
  const [notFound, setNotFound] = useState(false);
  const defaultValidators: Record<string, any>[] | null = [];
  const [validators, setValidators] = useState(defaultValidators);
  const [validatorsPagination, setValidatorsPagination] = useState(ApiParams.DEFAULT_PAGINATION);

  /**
   * Fetch one operator by it's address
   * @param address
   */
  const loadOperator = (address: string) => {
    setLoadingOperator(true);
    SsvNetwork.getInstance().fetchOperator(address).then((result: any) => {
      if (result.status === 404) {
        setNotFound(true);
      } else {
        setOperator(result.data);
        setLoadingOperator(false);
      }
    });
  };

  /**
   * Load all validators by operator address
   * @param address
   * @param paginationPage
   */
  const loadOperatorValidators = (address: string, paginationPage: number) => {
    if (paginationPage) {
      ApiParams.saveInStorage('operator:validators', 'page', paginationPage);
    }
    const page: number = ApiParams.getInteger('operator:validators', 'page', 1);
    const perPage: number = ApiParams.getInteger('operator:validators', 'perPage', ApiParams.PER_PAGE);
    setLoadingValidators(true);
    SsvNetwork.getInstance().fetchOperatorValidators(address, page, perPage).then((result: any) => {
      if (result.status === 404) {
        setNotFound(true);
      } else {
        setValidators(result.data.validators);
        setValidatorsPagination(result.data.pagination);
        setLoadingValidators(false);
      }
    });
  };

  /**
   * When per page dropdown changed
   * @param perPage
   */
  const onChangeRowsPerPage = (perPage: number) => {
    ApiParams.saveInStorage('operator:validators', 'perPage', perPage);
    loadOperatorValidators(params.address, 1);
  };

  useEffect(() => {
    if (!operator.address && !loadingOperator) {
      loadOperator(params.address);
    }
    if (!validators?.length && !loadingValidators) {
      loadOperatorValidators(params.address, 1);
    }
  }, [params.address, operator.address]);

  const isLoading = loadingValidators || loadingOperator;

  return (
    <Layout>
      <ContentContainer>
        <NotFoundScreen notFound={notFound}>
          <EmptyPlaceholder height={10} />

          <BreadCrumbs address={params.address} />

          <Grid container>
            <Grid container item justify="space-between">
              <Grid item lg={6} md={12} xs={12}>
                <OperatorName operator={operator} params={params} isLoading={isLoading} />
                <OperatorMetadata operator={operator} isLoading={isLoading} />
                <OperatorDescription operator={operator} isLoading={isLoading} />
                <OperatorSocialNetworks operator={operator} isLoading={isLoading} />
              </Grid>
              <OperatorInfo operator={operator} isLoading={isLoading} />
            </Grid>
          </Grid>

          <ValidatorsInOperatorTable
            params={params}
            validators={validators}
            pagination={validatorsPagination}
            onLoadPage={loadOperatorValidators}
            onChangeRowsPerPage={onChangeRowsPerPage}
            isLoading={isLoading}
            perPage={ApiParams.getInteger('operator:validators', 'perPage', ApiParams.PER_PAGE)}
          />

        </NotFoundScreen>
      </ContentContainer>
    </Layout>
  );
};

export default observer(Operator);
