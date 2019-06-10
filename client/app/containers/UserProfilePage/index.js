import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid } from '@material-ui/core';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import { makeSelectUser } from '../App/selectors';
import PageHeader from '../../components/PageHeader/PageHeader';
import UserProfileSettingsPage from '../../components/UserProfileSettings';
import UserPersonalInformationPage from './UserPersonalInformation';

/* eslint-disable react/prefer-stateless-function */

export class UserProfilePage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    user: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <Helmet>
          <title>Profile Page</title>
        </Helmet>
        <PageHeader style={{ paddingTop: 24 }}>
          <div className="container">
            <b>{user.name}</b>
            <br />
            <b style={{ fontSize: 16 }}>{user.email}</b>
          </div>
        </PageHeader>
        <br />
        <br />
        <div className="container">
          <Grid container spacing={8}>
            <Grid item xs={12} sm={3}>
              <UserProfileSettingsPage />
            </Grid>
            <Grid item xs={12} sm={9}>
              <UserPersonalInformationPage />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  root: {
    flexGrow: 1,
  },
  success: {
    backgroundColor: green[600],
  },
});

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(UserProfilePage);