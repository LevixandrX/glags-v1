import { FC, useEffect, useState } from "react";
import { X } from "lucide-react";

interface BuyNowModalProps {
  show: boolean;
  onClose: () => void;
  productTitle: string;
  price: number;
}

const BuyNowModal: FC<BuyNowModalProps> = ({
  show,
  onClose,
  productTitle,
  price,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (show) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow || "auto";
      };
    }
  }, [show]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      document.body.style.overflow = "auto"; // Сбрасываем overflow
    }, 200); // Соответствует длительности анимации fade-out
  };

  if (!show && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={handleClose}></div>
      <div
        className={`relative bg-[#181828] text-white rounded-2xl shadow-lg max-w-lg w-full p-6 z-50 ${
          isClosing ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Оформление покупки</h2>
          <button
            onClick={handleClose}
            aria-label="Закрыть"
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors duration-200 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div>
          <p className="mb-4">
            Вы покупаете: <strong>{productTitle}</strong>
          </p>
          <p className="mb-6">
            Цена: <strong>{price.toLocaleString()} ₽</strong>
          </p>
          <button
            onClick={() => alert("Здесь будет оформление заказа")}
            className="bg-[#EA698B] text-white py-2 px-4 rounded-xl w-full hover:bg-[#d65f7f] transition cursor-pointer"
          >
            Перейти к оплате
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-fade-out {
          animation: fade-out 0.2s ease-in;
        }
        @keyframes fade-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fade-out {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.95);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BuyNowModal;
