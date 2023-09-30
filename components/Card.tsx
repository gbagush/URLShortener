'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code';

export default function Card({ originalURL, shortenedURL }: { originalURL: string; shortenedURL: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedURL);
    setIsCopied(true);
  };

  return (
    <div className="bg-black text-white p-4 max-w-xl mx-auto rounded-lg shadow-md border border-white">
      <div className="mb-4">
        <label htmlFor="originalURL">Long URL</label>
        <input
            type="text"
            id="originalURL"
            value={originalURL}
            className="w-full p-2 border rounded text-white bg-black"
          />
      </div>
      <div className="mb-4">
        <label htmlFor="originalURL">Long URL</label>
        <input
          type="text"
          id="originalURL"
          value={shortenedURL}
          className="w-full p-2 border rounded text-white bg-black"
        />
      </div>
      <div className="mb-4">
        <p className="text-lg">QR Code:</p>
        <QRCode value={shortenedURL} size={128} />
      </div>
    </div>
  );
}
