import { StreamingType } from '@/types/Streaming';
import { streaming } from '@/data/streaming';
import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
  selectedStreaming: StreamingType | null;
  setSelectedStreaming: (streaming: StreamingType | null) => void;
};
const StreamingSelector = ({
  selectedStreaming,
  setSelectedStreaming,
}: Props) => {
  const handleOptionSelect = (option: StreamingType) => {
    setSelectedStreaming(option);
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
      {streaming.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionSelect(option)}
          className={`flex items-center justify-center rounded-full w-12 h-12 overflow-hidden bg-transparent hover:opacity-100 ${
            selectedStreaming === option ? 'opacity-100' : 'opacity-20'
          }`}
        >
          <Image src={option.logo} alt={option.name} width={80} height={80} />
        </button>
      ))}
    </div>
  );
};

export default StreamingSelector;
