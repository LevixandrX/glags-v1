import { Check } from "lucide-react";

interface CartControlsProps {
  itemsCount: number;
  selectedItemsCount: number;
  onSelectAll: () => void;
  onRemoveSelected: () => void;
  onClearCart: () => void;
}

export default function CartControls({ 
  itemsCount, 
  selectedItemsCount, 
  onSelectAll, 
  onRemoveSelected, 
  onClearCart 
}: CartControlsProps) {
  return (
         <div className="bg-gray-900/30 rounded-xl p-6 mb-6 border border-gray-700/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
                     <label className="flex items-center gap-3 cursor-pointer">
             <div className="relative w-6 h-6">
               <input
                 type="checkbox"
                 checked={selectedItemsCount === itemsCount && itemsCount > 0}
                 onChange={onSelectAll}
                 className="w-6 h-6 bg-gray-700 hover:bg-gray-600 border-2 border-gray-500 hover:border-gray-400 rounded-lg focus:ring-0 appearance-none transition-colors cursor-pointer"
               />
               {selectedItemsCount === itemsCount && itemsCount > 0 && (
                 <div className="absolute inset-0 bg-violet-600 hover:bg-violet-500 border-2 border-violet-600 hover:border-violet-500 rounded-lg flex items-center justify-center">
                   <Check className="w-4 h-4 text-white" strokeWidth={3} />
                 </div>
               )}
             </div>
             <span className="text-gray-300 text-base">Выбрать все</span>
           </label>
                     {selectedItemsCount > 0 && (
                           <button
                onClick={onRemoveSelected}
                className="text-red-400 hover:text-red-300 text-base transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10 cursor-pointer"
              >
                Удалить выбранные ({selectedItemsCount})
              </button>
           )}
        </div>
                           <button
            onClick={onClearCart}
            className="text-gray-400 hover:text-red-400 text-base transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 cursor-pointer"
          >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
           </svg>
           Очистить корзину
         </button>
      </div>
    </div>
  );
} 