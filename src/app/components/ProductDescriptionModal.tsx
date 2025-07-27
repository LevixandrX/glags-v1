import { FC, useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDescriptionModalProps {
  show: boolean;
  onClose: () => void;
  product: any;
  cartItem: any;
  quantity: number;
  stock: number;
  handleAddToCart: () => void;
  handleChangeQuantity: (newQty: number) => void;
  removeFromCart: (id: string, size: string, variant: string) => void;
  productId: string;
  sizeLabel: string;
  variantName: string;
}

const ProductDescriptionModal: FC<ProductDescriptionModalProps> = ({
  show,
  onClose,
  product,
  cartItem,
  quantity,
  stock,
  handleAddToCart,
  handleChangeQuantity,
  removeFromCart,
  productId,
  sizeLabel,
  variantName,
}) => {
  const [inputValue, setInputValue] = useState(quantity.toString());
  const [showMaxMsg, setShowMaxMsg] = useState(false);
  const maxQty = stock;
  const inCart = !!cartItem;

  useEffect(() => {
    if (show) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'auto';
      };
    }
  }, [show]);

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[99999] flex items-stretch justify-end">
      {/* Overlay для затемнения всей страницы, включая хэдер и футер */}
      <div className="absolute inset-0 z-[99999] bg-black/80 pointer-events-none" aria-hidden="true" />
      {/* Клик для закрытия */}
      <div
        className="absolute inset-0 z-[99999]"
        onClick={onClose}
        aria-label="Закрыть модальное окно"
        style={{ background: 'transparent' }}
      />
      {/* Модальное окно справа */}
      <div
        className="relative h-full max-w-[480px] w-full bg-[#181828] text-white shadow-2xl flex flex-col overflow-hidden animate-slide-in-right z-[100000]"
        style={{ minWidth: 320 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-2xl z-10"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        <div className="flex-1 overflow-y-auto px-8 pt-8 pb-4">
          <h2 className="text-2xl font-bold mb-6 text-left">Характеристики и описание</h2>
          <div className="mb-6">
            <span className="block text-lg font-semibold mb-2">Основная информация</span>
            <ProductDetails characteristics={product.characteristics} />
          </div>
          <div className="mb-6">
            <span className="block text-lg font-semibold mb-2">Описание</span>
            <div className="text-base text-white/90 leading-relaxed whitespace-pre-line">
              {product.description}
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 left-0 w-full bg-[#23232B] rounded-b-2xl px-8 py-6 flex flex-col gap-3 shadow-2xl z-10">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-3xl font-bold text-pink-400">{product.price.toLocaleString()} ₽</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">{product.oldPrice.toLocaleString()} ₽</span>
            )}
            {product.oldPrice && (
              <span className="ml-2 text-base bg-pink-600 text-white rounded px-2 py-0.5 font-bold">-{Math.round(100 - (product.price / product.oldPrice) * 100)}%</span>
            )}
          </div>
          {!inCart ? (
            <button
              onClick={handleAddToCart}
              className="w-full min-h-[52px] bg-[#EA698B] hover:bg-[#d65f7f] transition-colors rounded-2xl text-white font-semibold text-xl flex items-center justify-center gap-3 shadow-lg"
            >
              <Image src="/icons/local_mall.svg" alt="Cart Icon" width={26} height={26} />
              В корзину
            </button>
          ) : (
            <div className="flex flex-row items-center justify-between gap-4 w-full min-h-[52px]">
              <Link
                href="/cart"
                className="h-[52px] px-4 flex items-center justify-center bg-[#EA698B]/25 hover:bg-[#EA698B]/40 transition-colors rounded-2xl text-[#EA698B] font-semibold text-lg whitespace-nowrap text-center shadow-md"
              >
                Перейти в корзину
              </Link>
              <div className="flex flex-col items-center relative">
                <div className="flex flex-row items-center gap-0 bg-[#23232B] rounded-xl px-2 py-1 h-[52px] min-w-[120px]">
                  <button
                    onClick={() =>
                      quantity > 1
                        ? handleChangeQuantity(quantity - 1)
                        : cartItem && removeFromCart(productId, sizeLabel, variantName)
                    }
                    className={`w-12 h-10 rounded-xl text-white font-bold text-2xl flex items-center justify-center transition-colors
                      ${
                        quantity < 2
                          ? "bg-[#FF5656] hover:bg-[#e04d4d]"
                          : "bg-[#EA698B] hover:bg-[#d65f7f]"
                      }
                      disabled:bg-[#FF5656] disabled:opacity-70`}
                    disabled={quantity <= 1 && !cartItem}
                  >
                    –
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={inputValue}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9]/g, "");
                      if (val !== "" && parseInt(val, 10) > maxQty)
                        val = maxQty.toString();
                      setInputValue(val);
                    }}
                    onBlur={() => {
                      const val = parseInt(inputValue, 10);
                      if (isNaN(val) || val < 1) {
                        setInputValue(quantity.toString());
                      } else if (val >= maxQty) {
                        setInputValue(maxQty.toString());
                        handleChangeQuantity(maxQty);
                        setShowMaxMsg(true);
                        setTimeout(() => setShowMaxMsg(false), 1500);
                      } else {
                        handleChangeQuantity(val);
                      }
                    }}
                    className="text-2xl w-16 text-center text-white select-none bg-transparent border-none outline-none focus:ring-0 appearance-none hide-number-arrows"
                    style={{ boxShadow: "none" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    autoComplete="off"
                  />
                  <button
                    onClick={() => {
                      if (quantity < maxQty) {
                        handleChangeQuantity(quantity + 1);
                        if (quantity + 1 === maxQty) {
                          setShowMaxMsg(true);
                          setTimeout(() => setShowMaxMsg(false), 1500);
                        }
                      } else {
                        setShowMaxMsg(true);
                        setTimeout(() => setShowMaxMsg(false), 1500);
                      }
                    }}
                    className={`w-12 h-10 bg-[#EA698B] hover:bg-[#d65f7f] transition-colors rounded-xl text-white font-bold text-2xl flex items-center justify-center${
                      quantity >= maxQty ? " opacity-60 cursor-not-allowed" : ""
                    }`}
                    tabIndex={0}
                  >
                    +
                  </button>
                </div>
                {showMaxMsg && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-16 z-10">
                    <div className="relative">
                      <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#23232B]" />
                      <div className="bg-[#23232B] text-white text-sm rounded-xl px-4 py-3 shadow-lg min-w-[220px] text-center">
                        Выбрано максимальное количество, доступное для заказа
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Анимация выезда справа */}
      <style jsx>{`
        .animate-slide-in-right {
          animation: slide-in-right 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0.7;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDescriptionModal; 