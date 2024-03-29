import * as React from 'react';
import WishFilter from '@components/WishFilter';
import WishList from '@components/WishList';
import { styles } from './styles';

export default function Wish() {
  return (
    <main css={styles.wishZone}>
      <h2 css={styles.wishTitle}>찜 목록</h2>
      <WishFilter />
      <WishList />
    </main>
  );
}
