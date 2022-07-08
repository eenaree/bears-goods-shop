import * as React from 'react';
import { css } from '@emotion/react';
import { BiError } from 'react-icons/bi';

interface Props {
  children: React.ReactNode;
}

const styles = {
  errorZone: css({
    textAlign: 'center',
    margin: '10rem auto',
  }),
  errorText: css({
    margin: '2rem 0',
    fontSize: '1.4rem',
  }),
};

export default function ErrorMessage({ children }: Props): React.ReactElement {
  return (
    <section css={styles.errorZone}>
      <BiError size="5rem" color="#ff0000" />
      <p css={styles.errorText}>{children}</p>
    </section>
  );
}
