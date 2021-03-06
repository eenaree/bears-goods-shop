import * as React from 'react';
import { Link } from 'react-router-dom';
import CartList from '@components/CartList';
import CartPrice from '@components/CartPrice';
import CartTool from '@components/CartTool';
import { useAppSelector } from '@store/hooks';
import { selectCart } from '@store/slices/cartSlice';
import { styles } from './styles';

export default function Cart() {
  const cart = useAppSelector(selectCart);

  return (
    <main css={styles.cartZone}>
      <h2 css={styles.cartTitle}>장바구니</h2>
      {cart.length > 0 ? (
        <section css={styles.cartContents}>
          <div css={styles.cartListWrapper}>
            <CartTool />
            <CartList />
          </div>
          <CartPrice />
        </section>
      ) : (
        <div css={styles.noneCart}>
          <p>장바구니에 담긴 상품이 없습니다.</p>
          <Link to="/">상품 구경하기</Link>
        </div>
      )}
    </main>
  );
}
