import * as React from 'react';
import { css, keyframes } from '@emotion/react';
import { useLoader } from '@context/LoaderContext';

const infiniteLotation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const styles = {
  spinner: (isLoading: boolean) =>
    isLoading &&
    css({
      zIndex: 1,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginLeft: '-25px',
      marginTop: '-25px',
      width: 40,
      height: 40,
      border: '5px solid #eee',
      borderTopColor: '#666',
      borderRadius: '50%',
      animationName: infiniteLotation,
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
    }),
};

export default function LoadingSpinner() {
  const isLoading = useLoader();
  return <div css={styles.spinner(isLoading)} />;
}
