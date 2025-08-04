interface DeliveryInfoProps {
  total: number;
}

export default function DeliveryInfo({ total }: DeliveryInfoProps) {
  const freeDeliveryThreshold = 5000;
  const remainingForFreeDelivery = freeDeliveryThreshold - total;
  const isFreeDelivery = total >= freeDeliveryThreshold;

  return (
    <div className="bg-gray-800/30 rounded-lg p-4 mb-4 border border-gray-700/30">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span className="text-sm font-medium text-gray-200">Доставка</span>
      </div>
      
      {isFreeDelivery ? (
        <div className="text-green-400 text-sm">
          Бесплатная доставка
        </div>
      ) : (
        <div className="space-y-1">
          <div className="text-gray-300 text-sm">
            До бесплатной доставки: {remainingForFreeDelivery.toLocaleString()} ₽
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((total / freeDeliveryThreshold) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
} 