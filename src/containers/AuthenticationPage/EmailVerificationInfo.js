import React from 'react';

import { FormattedMessage } from '../../util/reactIntl';
import { Link } from 'react-router-dom';

import {
  Heading,
  NamedLink,
  IconEmailSent,
  InlineTextButton,
  IconClose,
  Button,
} from '../../components';

import css from './AuthenticationPage.module.css';

import addListingImage from './post-listing-link.png';

const EmailVerificationInfo = props => {
  const {
    user,
    name,
    email,
    onResendVerificationEmail,
    resendErrorMessage,
    sendVerificationEmailInProgress,
  } = props;

  /* both || sell || buy */
  const isOnlyBuyer = user.attributes.profile.publicData.buy_sell === 'buy';

  const resendEmailLink = (
    <InlineTextButton rootClassName={css.modalHelperLink} onClick={onResendVerificationEmail}>
      <FormattedMessage id="AuthenticationPage.resendEmailLinkText" />
    </InlineTextButton>
  );

  const fixEmailLink = (
    <NamedLink className={css.modalHelperLink} name="ContactDetailsPage">
      <FormattedMessage id="AuthenticationPage.fixEmailLinkText" />
    </NamedLink>
  );

  return (
    <div className={css.content}>
      <NamedLink className={css.verifyClose} name="ProfileSettingsPage">
        <span className={css.closeText}>
          <FormattedMessage id="AuthenticationPage.verifyEmailClose" />
        </span>
        <IconClose rootClassName={css.closeIcon} />
      </NamedLink>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1px',
          flexDirection: 'column',
        }}
      >
        <IconEmailSent className={css.modalIcon} />

        {!isOnlyBuyer && (
          <span
            className="marketplaceTinyFontStyles"
            style={{
              textAlign: 'center',
              marginTop: '-1rem',
              fontStyle: 'italic',
            }}
          >
            Please verify your email so we can contact you.
          </span>
        )}
      </div>

      {isOnlyBuyer ? (
        <>
          <Heading as="h1" rootClassName={css.modalTitle}>
            <FormattedMessage id="AuthenticationPage.verifyEmailTitle" values={{ name }} />
          </Heading>
          <p className={css.modalMessage}>
            <FormattedMessage id="AuthenticationPage.verifyEmailText" values={{ email }} />
          </p>
        </>
      ) : (
        <div className={css.modalMessage}>
          <p style={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>
            Hi {name}, Welcome to madelocal!
          </p>
          <p style={{ fontSize: '24px', textAlign: 'center' }}>Two steps left to start selling:</p>

          <p>
            1: Add Payout Details (so we can pay you). We use Stripe to process payments straight to
            your bank.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button>
              <Link to="/account/payments">
                <span style={{ color: '#fff' }}>Add Payout Details</span>
              </Link>
            </Button>
          </div>

          <p>
            2: Add your first listing and be found. Click "Post a new listing" in the top right
            corner and follow the steps!
          </p>

          <div>
            <img src={addListingImage} style={{ height: '100%', width: '100%' }}></img>
          </div>
        </div>
      )}

      {resendErrorMessage}

      <div className={css.bottomWrapper}>
        <p className={css.modalHelperText}>
          {sendVerificationEmailInProgress ? (
            <FormattedMessage id="AuthenticationPage.sendingEmail" />
          ) : (
            <FormattedMessage id="AuthenticationPage.resendEmail" values={{ resendEmailLink }} />
          )}
        </p>
        <p className={css.modalHelperText}>
          <FormattedMessage id="AuthenticationPage.fixEmail" values={{ fixEmailLink }} />
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationInfo;
