import React from 'react'
import AppLogoIcon from './app-logo-icon';

const ReceiptHeader = () => {
  return (
      <div className="flex w-full items-center justify-between px-3">
          <div className="flex flex-1 items-center justify-between text-lg font-bold md:text-xl lg:text-2xl">
              <h2 className="bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">BasitIshaq Ltd</h2>
              <AppLogoIcon className="lg:size-36 md:size-28 size-20" />
          </div>

          <h2 className="lg:text-2x w-fit bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 bg-clip-text text-lg font-bold text-transparent md:text-xl">
              د باسط اسحاق تجارتي شرکت
          </h2>
      </div>
  );
}

export default ReceiptHeader
