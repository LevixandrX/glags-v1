interface ProductDetailsProps {
  characteristics: Array<{ label: string; value: string }>;
}

export default function ProductDetails({
  characteristics,
}: ProductDetailsProps) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {characteristics.map((c) => (
        <div
          key={c.label}
          className="grid grid-cols-[1fr_2fr] items-center"
        >
          <div className="flex items-center">
            <span className="text-white/50 text-base whitespace-nowrap mr-2">{c.label}</span>
            <span className="border-b border-dashed border-white/50 flex-1 mt-2.75"></span>
          </div>
          <span className="text-white text-base text-left whitespace-nowrap ml-2">{c.value}</span>
        </div>
      ))}
    </div>
  );
}