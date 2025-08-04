import DeliveryInfo from "./DeliveryInfo";
import LoadingButton from "./LoadingButton";
import { getItemsCountText } from "../utils/declension";

interface CartSummaryProps {
  itemsCount: number;
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({ itemsCount, total, onCheckout }: CartSummaryProps) {
  const discount = Math.round(total * 0.1); // 10% скидка
  const finalTotal = total - discount;

  return (
    <div className="lg:w-80">
      <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30 sticky top-8">
        <h2 className="text-lg font-semibold text-white mb-4">Итого заказа</h2>
        
        {/* Детализация */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-300">
            <span>Товары ({getItemsCountText(itemsCount)})</span>
            <span>{total.toLocaleString()} ₽</span>
          </div>
          <div className="flex justify-between text-green-400">
            <span>Скидка</span>
            <span>-{discount.toLocaleString()} ₽</span>
          </div>
          <div className="border-t border-gray-700 pt-3">
            <div className="flex justify-between text-lg font-semibold text-white">
              <span>Итого</span>
              <span>{finalTotal.toLocaleString()} ₽</span>
            </div>
          </div>
        </div>

        {/* Информация о доставке */}
        <DeliveryInfo 
        total={total} 
        />

        {/* Кнопка оформления */}
        <LoadingButton
          className="w-full py-4 mb-4"
          onClick={onCheckout}
        >
          Оформить заказ
        </LoadingButton>

        {/* Дополнительная информация */}
        <div className="text-xs text-gray-400 space-y-2">
          <p>• Возврат в течение 14 дней</p>
          <p>• Безопасная оплата</p>
          <p>• Поддержка 24/7</p>
        </div>
      </div>
    </div>
  );
} 