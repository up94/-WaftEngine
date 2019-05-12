/**
 *
 * AdminModuleManage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import VpnKey from '@material-ui/icons/VpnKey';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Table from 'components/Table';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll } from './selectors';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';

/* eslint-disable react/prefer-stateless-function */
export class AdminModuleManage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  componentDidMount() {
    this.props.loadAllRequest();
  }

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/module-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/module-manage/edit/${id}`);
  };

  handleAccessEdit = id => {
    this.props.push(`/admin/module-manage/access/${id}`);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  render() {
    const {
      classes,
      all: { data, page, size, totaldata },
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(({ _id, module_name, description }) => [
      module_name,
      description,
      <>
        <button
          className="text-blue hover:bg-grey-lighter rounded-full w-10 h-10 text-center"
          onClick={() => this.handleEdit(_id)}
        >
          <CreateIcon />
        </button>
        <button
          className="text-blue hover:bg-grey-lighter rounded-full w-10 h-10 text-center"
          onClick={() => this.handleAccessEdit(_id)}
        >
          <VpnKey />
        </button>
      </>,
    ]);
    return (
      <>
        <PageHeader>Module Manage</PageHeader>
        <PageContent>
          <Table
            tableHead={['Module Name', 'Description', '']}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
          />
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.handleAdd}
          >
            <AddIcon />
          </Fab>
        </PageContent>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminModuleManage', reducer });
const withSaga = injectSaga({ key: 'adminModuleManage', saga });

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 4,
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AdminModuleManage);
