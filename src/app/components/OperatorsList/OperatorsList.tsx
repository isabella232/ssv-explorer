import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Box, Grid } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import { infoIconStyle } from '~root/theme';
import SsvNetwork from '~lib/api/SsvNetwork';
import Status from '~app/common/components/Status';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';
import Banner from '~app/common/components/Banner';
import { longStringShorten } from '~lib/utils/strings';
import DataTable from '~app/common/components/DataTable';
import { getPerformances } from '~lib/utils/performance';
import InfoTooltip from '~app/common/components/InfoTooltip';
import OperatorType from '~app/common/components/OperatorType';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import ContentContainer from '~app/common/components/ContentContainer';
import { DEVELOPER_FLAGS, getLocalStorageFlagValue } from '~lib/utils/DeveloperHelper';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const OperatorsList = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const defaultOperators: Record<string, any>[] = [];
  const [operators, setOperators] = useState(defaultOperators);
  const [pagination, setPagination] = useState(ApiParams.DEFAULT_PAGINATION);

  /**
   * Loading operators by page
   * @param paginationPage
   */
  const loadOperators = (paginationPage?: number) => {
    const validatorsInOperatorPage: number = ApiParams.getInteger('operators', 'page');
    if (validatorsInOperatorPage !== 1) {
      ApiParams.saveInStorage('operator:validators', 'page', 1);
    }
    if (paginationPage) {
      ApiParams.saveInStorage('operators', 'page', paginationPage);
    }

    const page: number = ApiParams.getInteger('operators', 'page', 1);
    const perPage: number = ApiParams.getInteger('operators', 'perPage', ApiParams.PER_PAGE);

    setLoading(true);
    SsvNetwork.getInstance().fetchOperators({ page, perPage, validatorsCount: 'true', status: 'true' })
      .then((result: any) => {
        setOperators(result.data.operators);
        setPagination(result.data.pagination);
        setLoading(false);
      });
  };

  /**
   * When per page dropdown changed
   * @param perPage
   */
  const onChangeRowsPerPage = (perPage: number) => {
    ApiParams.saveInStorage('operators', 'perPage', perPage);
    loadOperators(1);
  };

  const getOperatorsTableData = () => {
    return (operators || []).map((operator: any) => {
      const data = [
        <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link}>
          <Grid item className={classes.OperatorLogo} style={{ backgroundImage: operator.logo ? `url(${operator.logo})` : '' }} />
          {operator.name}
          <OperatorType type={operator.type} />
        </Link>,
        <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link}>
          <Box component="div" display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
            {longStringShorten(operator.address)}
          </Box>
          <Box component="div" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
            {operator.address}
          </Box>
        </Link>,
        <Box component="div" display={{ xs: 'block', sm: 'block', md: 'block', lg: 'block' }}>
          <Status status={operator.status} />
        </Box>,
        <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link}>
          {operator.validators_count}
        </Link>,
      ];

      const performances = getPerformances(operator.performances);
      for (let i = 0; i < performances.length; i += 1) {
        const performance = performances[i];
        data.push(
          <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link}>
            {`${performance.value}%`}
          </Link>,
        );
      }
      return data;
    });
  };

  const getOperatorsTableHeaders = () => {
    const headers = [
      'Name',
      'Address',
      <div>
        Status
        <InfoTooltip
          style={{ ...infoIconStyle, marginBottom: -2 }}
          message="Is the operator performing duties for the majority of its validators in the last 10 epochs."
        />
      </div>,
      'Validators',
    ];

    if (getLocalStorageFlagValue(DEVELOPER_FLAGS.SHOW_OPERATORS_TABLE_PERFORMANCE_COLUMNS)) {
      const operator = operators.length ? operators[0] : null;
      if (!operator) {
        return headers;
      }

      if (!operator.performances) {
        console.warn('Operators performance columns enabled, but operators does not have performance information!');
        return headers;
      }

      const performances = getPerformances(operator.performances, { '30days': '30d', '24hours': '24h' });
      for (let i = 0; i < performances.length; i += 1) {
        const performance = performances[i];
        headers.push(`Performance (${performance.label})`);
      }
    }

    return headers;
  };

  useEffect(() => {
    if (!operators.length && !loading) {
      loadOperators();
    }
  }, [operators.length]);

  return (
    <Layout>
      <ContentContainer>
        <EmptyPlaceholder height={10} />
        <Banner />
        <BreadCrumbsContainer>
          <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
          <BreadCrumbDivider />
          <BreadCrumb href={config.routes.OPERATORS.HOME}>operators</BreadCrumb>
        </BreadCrumbsContainer>

        <Typography variant="h1">Operators</Typography>

        <DataTable
          headers={getOperatorsTableHeaders()}
          data={getOperatorsTableData()}
          totalCount={pagination.total}
          page={pagination.page - 1}
          onChangePage={loadOperators}
          onChangeRowsPerPage={onChangeRowsPerPage}
          perPage={ApiParams.getInteger('operators', 'perPage', ApiParams.PER_PAGE)}
          isLoading={loading}
        />
      </ContentContainer>
    </Layout>
  );
};

export default observer(OperatorsList);
