import Image from "next/image";
import React from "react";

interface NoImagePlaceholderProps {
  width?: number | string;
  height?: number | string;
  iconSize?: number;
  textSize?: string;
  bgColor?: string;
  textAlign?: "center" | "left" | "right";
  className?: string;
  textPadding?: string;
}

export default function NoImagePlaceholder({
  width = 80,
  height = 80,
  iconSize = 40,
  textSize = "13px",
  bgColor = "#D9D9D9",
  textAlign = "center",
  className = "",
  textPadding = "0px",
}: NoImagePlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[10px] ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        minWidth: typeof width === "number" ? `${width}px` : width,
        minHeight: typeof height === "number" ? `${height}px` : height,
        background: bgColor,
        textAlign,
        overflow: "hidden",
      }}
    >
      <Image
        src="/icons/no-image1.svg"
        alt="Нет изображения"
        width={iconSize}
        height={iconSize}
        style={{ width: iconSize, height: iconSize, minWidth: iconSize, minHeight: iconSize }}
        className="opacity-60 mb-3"
      />
      <span style={{ fontSize: textSize, color: "#575757", fontWeight: 500, padding: textPadding, wordBreak: "break-word", whiteSpace: "pre-line" }}>
        Нет изображения
      </span>
    </div>
  );
} 