import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCartDispatch, useCartState } from '@context/CartContext';
import CartItem from '@components/CartItem';
import { addThousandSeperatorToNumber } from '@utils';
import {
  CartItemList,
  Container,
  PriceBox,
  ButtonWrapper,
  CartItemAllCheckbox,
  NoneCartList,
  ToolTipText,
} from './styles';
import DeleteConfirmModal from '@components/DeleteConfirmModal';
import { CartItemOption } from '@typings/db';
import { FcAbout } from 'react-icons/fc';

export default function Cart(): React.ReactElement {
  const { cart, cartTotalPrice, allSelected } = useCartState();
  const dispatch = useCartDispatch();
  const renderCartItemList: React.ReactElement[] = cart.map(item => (
    <CartItem key={item.name + item.size} item={item} />
  ));

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [modal, setModal] = useState<boolean>(false);
  const selectedCartItem = useMemo<CartItemOption[]>(
    () => cart.filter(item => item.selected),
    [cart]
  );
  const handleDeleteClick = () => {
    if (!selectedCartItem.length) {
      alert('선택된 상품이 없습니다. 삭제할 상품을 선택하세요.');
      return;
    }
    setModal(true);
  };

  const handleAllCheckedChange = () => {
    dispatch({ type: 'TOGGLE_ALL_SELECT' });
  };

  return (
    <>
      <Container>
        <h2>장바구니</h2>
        {cart.length > 0 ? (
          <>
            <CartItemAllCheckbox>
              <input
                type="checkbox"
                id="allCheck"
                checked={allSelected}
                onChange={handleAllCheckedChange}
              />
              <label htmlFor="allCheck">전체 선택</label>
            </CartItemAllCheckbox>
            <CartItemList>{renderCartItemList}</CartItemList>
            <PriceBox>
              <p>
                <span>주문금액</span>
                <span>
                  {addThousandSeperatorToNumber(cartTotalPrice)}
                  &nbsp;원
                </span>
              </p>
              <p>
                <span>
                  배송비
                  <FcAbout />
                  <ToolTipText>5만원 이상 구매시 무료배송</ToolTipText>
                </span>
                <span>
                  {selectedCartItem.length > 0 && cartTotalPrice < 50000
                    ? addThousandSeperatorToNumber(3000)
                    : 0}
                  &nbsp;원
                </span>
              </p>
              <hr />
              <p>
                <span>총 주문금액</span>
                <span>
                  <strong>
                    {selectedCartItem.length > 0 && cartTotalPrice < 50000
                      ? addThousandSeperatorToNumber(cartTotalPrice + 3000)
                      : addThousandSeperatorToNumber(cartTotalPrice)}
                  </strong>
                  &nbsp;원
                </span>
              </p>
            </PriceBox>
            <ButtonWrapper>
              <button onClick={handleDeleteClick}>선택 삭제</button>
              <button>주문하기</button>
            </ButtonWrapper>
          </>
        ) : (
          <NoneCartList>
            <p>장바구니에 담긴 상품이 없습니다.</p>
            <Link to="/">상품 구경하기</Link>
          </NoneCartList>
        )}
      </Container>
      {modal && <DeleteConfirmModal setModal={setModal} />}
    </>
  );
}
