import { css } from '@emotion/react';
import { mq } from '@styles/mediaQueries';

export const styles = {
  cartItemWrapper: css({
    margin: '20px 0',
    borderTop: '1px solid #eee',
  }),
  cartItemZone: css({
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    padding: '10px 0',
    fontSize: '1.3rem',
    [mq('xs')]: {
      fontSize: '1.4rem',
    },
  }),
  cartItemImage: css({
    flex: '0 0 auto',
    width: 80,
    height: 80,
    [mq('xs')]: {
      width: 100,
      height: 100,
      padding: '0 10px',
    },
  }),
  cartItemInfo: css({
    flex: '1 1 auto',
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    '> *': {
      padding: '4px 0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    strong: {
      fontWeight: 700,
    },
  }),
};
