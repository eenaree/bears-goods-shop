import * as React from 'react';
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import Header from '@layouts/Header';
import { mq } from '@styles/mediaQueries';

const styles = {
  containerInner: css({
    [mq('lg')]: {
      width: 1100,
      margin: '0 auto',
    },
  }),
};

export default function AppLayout(): React.ReactElement {
  return (
    <>
      <Header />
      <div css={styles.containerInner}>
        <Outlet />
      </div>
    </>
  );
}