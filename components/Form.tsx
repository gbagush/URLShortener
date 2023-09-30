'use client'

import { useState } from 'react'
import Card from './Card';

export default function Form() {
  const [longURL, setLongURL] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [shortenedURL, setShortenedURL] = useState('');
  const [error, setError] = useState('');

  const handleLongURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongURL(event.target.value);
  };

  const handleCustomAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAddress(event.target.value);
  };

  const toggleCustomAddress = () => {
    setUseCustomAddress(!useCustomAddress);
  };

  const generateShortURL = async () => {
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: longURL,
          customUnique: useCustomAddress ? customAddress : '',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortenedURL(data.id);
        setError('');
      } else {
        setError('Error shortening URL');
      }
    } catch (error) {
      setError('Error shortening URL');
    }
  };

  return (
    <div className="text-white p-4 max-w-xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          id="longURL"
          value={longURL}
          onChange={handleLongURLChange}
          className="w-full p-2 border rounded text-white bg-black"
          placeholder="Long URL"
        />
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          id="useCustomAddress"
          checked={useCustomAddress}
          onChange={toggleCustomAddress}
          className="mr-2"
        />
        <label htmlFor="useCustomAddress">Use custom address</label>
      </div>
      {useCustomAddress && (
        <div className="mb-4">
          <input
            type="text"
            id="customAddress"
            value={customAddress}
            onChange={handleCustomAddressChange}
            className="w-full p-2 border rounded text-white bg-black"
            placeholder="Custom Address"
          />
        </div>
      )}
      <button
        onClick={generateShortURL}
        className="bg-black border border-white text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Generate Short URL
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}
      {shortenedURL && (
        <div className="mt-4">
          <Card originalURL={longURL} shortenedURL={`${window.location.origin}/${shortenedURL}`} />
        </div>
      )}
    </div>
  );
}