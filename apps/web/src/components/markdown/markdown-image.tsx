"use client";

import Image from "next/image";
import React, { useState } from "react";

interface MarkdownImageProps {
  src: string;
  alt?: string;
}

function MarkdownImage({ src, alt }: MarkdownImageProps) {
  const [aspectRatio, setAspectRatio] = useState(1);

  return (
    <div className="my-10 text-center">
      <div
        className="relative mx-auto max-h-[200px] overflow-hidden rounded-2xl sm:max-h-[400px]"
        style={{
          maxWidth: "100%",
          aspectRatio: aspectRatio,
        }}
      >
        <Image
          className="rounded-2xl object-contain"
          src={src}
          alt={alt ?? "Image"}
          fill
          priority={true}
          onLoadingComplete={(target) => {
            setAspectRatio(target.naturalWidth / target.naturalHeight);
          }}
        />
      </div>
      {alt && (
        <div className="text-light-gray-70 mb-4 mt-2 text-center text-sm">
          {alt}
        </div>
      )}
    </div>
  );
}

export default MarkdownImage;
