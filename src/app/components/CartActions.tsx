interface CartItem {
  id: string;
  size: string;
  variant: string;
  quantity: number;
}

interface CartActionsProps {
  price: number;
  oldPrice?: number;
  cartItem: CartItem | null;
  quantity: number;
  stock: number;
  handleAddToCart: () => void;
  handleChangeQuantity: (newQty: number) => void;
  handleBuyNow: () => void;
  removeFromCart: (id: string, size: string, variant: string) => void;
  productId: string;
  sizeLabel: string;
  variantName: string;
}

export default function CartActions({
  price,
  oldPrice,
  cartItem,
  quantity,
  stock,
  handleAddToCart,
  handleChangeQuantity,
  handleBuyNow,
  removeFromCart,
  productId,
  sizeLabel,
  variantName
}: CartActionsProps) {
  return (
    <div className="w-full bg-black/70 rounded-2xl p-6 flex flex-col gap-4 items-center shadow-2xl mt-4">
      <div className="flex items-end gap-3 flex-wrap">
        <span className="text-4xl font-bold text-pink-400">{price.toLocaleString()} ₽</span>
        {oldPrice && (
          <span className="text-xl text-gray-400 line-through">{oldPrice.toLocaleString()} ₽</span>
        )}
        {oldPrice && (
          <span className="ml-2 text-base bg-pink-600 text-white rounded px-2 py-0.5 font-bold">-{Math.round(100 - (price / oldPrice) * 100)}%</span>
        )}
      </div>
      <div className="flex gap-3 w-full">
        {!cartItem ? (
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg py-3 text-lg transition shadow-lg"
          >
            В корзину
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-3">
            <button
              onClick={() => quantity > 1 ? handleChangeQuantity(quantity - 1) : (cartItem && removeFromCart(productId, sizeLabel, variantName))}
              className="text-white text-2xl font-semibold w-12 h-12 rounded-xl flex items-center justify-center leading-none transition-colors bg-pink-400 hover:bg-pink-500"
              disabled={quantity <= 1 && !cartItem}
            >
              -
            </button>
            <span className="text-2xl w-12 text-center">{quantity}</span>
            <button
              onClick={() => handleChangeQuantity(quantity + 1)}
              className="text-white text-2xl font-semibold w-12 h-12 rounded-xl flex items-center justify-center leading-none transition-colors bg-pink-400 hover:bg-pink-500"
              disabled={quantity >= stock}
            >
              +
            </button>
          </div>
        )}
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg py-3 text-lg transition shadow-lg"
        >
          Купить сейчас
        </button>
      </div>
      {stock < 5 && (
        <div className="text-red-400 text-center text-base font-semibold">осталось {stock} шт.</div>
      )}
    </div>
  );
} 