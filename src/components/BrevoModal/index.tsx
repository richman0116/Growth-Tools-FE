import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button } from "../ui/button";
import { Input } from '../ui/input';
import { toastSuccess } from '@/helpers/toasts';

interface IBrevoModal {
  closeModal: any
}

const BrevoModal = ({ closeModal }: IBrevoModal) => {

  const [email, setEmail] = useState<string>("");
  const [errorMessge, setErrorMessage] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setEmail(e.target.value)
  }
  
  const handleSubmitClick = async () => {
    if (email === "") {
      setErrorMessage('Please input your email.')
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;

      if (!apiKey) {
        console.log('API key is missing');
        return;
      }

      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'api-key': apiKey,
        }),
        body: JSON.stringify({
          email: email,
          // listIds: [2],  // Replace with your actual list ID
          updateEnabled: true,
        }),
      });

    if (response.ok) {
      toastSuccess("Subscription successful!")
      closeModal();
    } else {
      const errorData = await response.json();
      setErrorMessage(`Subscription failed: ${errorData.message}`);
      setEmail('');
    }

  }

  return (
    <div id="modelConfirm" className="fixed z-50 inset-0 bg-gray-900 bg-opacity-80 overflow-y-auto h-full w-full flex items-center">
      <div className="shadow-2xl mx-auto rounded-2xl bg-white px-7 pt-7 pb-14 w-[800px] dark:bg-black">
        <div className='flex flex-row justify-between'>
          <h1 className='font-clash text-[25px] font-bold dark:text-white'>Get Your Daily Dose of News with a Growth Tools</h1>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <p className='font-satoshi text-[15px] text-description dark:text-white mt-2'>Learn & grow with FREE marketing guides & tips from the greatest marketers.</p>
        <div className="relative w-full mt-12">
          <Input
            value={email}
            onChange={handleChange}
            className="ml-auto rounded-full h-14 w-full text-md pl-6 shadow-xl dark:text-white"
            type="search"
            placeholder="Email address..."
          />
          <Button
            className="px-14 absolute top-1/2 -translate-y-1/2 right-1 h-12 bg-gradient-to-r from-blue-700 to-blue-500"
            onClick={handleSubmitClick}
          >
            <p className='text-[16px]'>Submit</p>
          </Button>
        </div>
        {errorMessge ? <div className='text-red-500 mt-2 text-sm ml-4'>{errorMessge}</div> : ""}
      </div>
    </div>
  );
};

export default BrevoModal;
