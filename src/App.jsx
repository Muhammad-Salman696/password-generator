import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  // State to store the password length (slider input)
  const [length, setLength] = useState(8);

  // State to track if numbers are allowed in the password
  const [numbersAllowed, setNumbersAllowed] = useState(false);

  // State to track if special characters are allowed
  const [charsAllowed, setCharsAllowed] = useState(false);

  // Final generated password
  const [password, setPasswords] = useState('');

  // Ref to the password input field so we can copy the value
  const passwordRef = useRef(null);

  // Function to copy the generated password to clipboard
  const CopyPasswordtoClipboard = () => {
    passwordRef.current?.select(); // Select the password text
    window.navigator.clipboard.writeText(password); // Copy it to clipboard
  };

  // Function to generate a random password
  // useCallback helps React remember the function unless dependencies change
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Base characters (letters)

    // Add numbers and special characters based on user selection
    if (numbersAllowed) str += '0123456789';
    if (charsAllowed) str += '!@#$%^&*';

    // Generate random characters from the full character set
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length); // Safe range
      pass += str.charAt(index);
    }

    // Save the generated password in state
    setPasswords(pass);
  }, [length, numbersAllowed, charsAllowed, setPasswords]);

  // Generate a new password whenever any setting changes (length, options)
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charsAllowed, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-center text-white my-3'>Password Generator</h1>

        {/* Display the password with a copy button */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            placeholder='Password'
            className='outline-none w-full px-1 py-3 bg-white'
            ref={passwordRef}
            readOnly
          />
          <button
            className='outline-none bg-blue-700 text-white shrink-0 py-0.5 px-3'
            onClick={CopyPasswordtoClipboard}
          >
            Copy
          </button>
        </div>

        {/* Settings: Length slider and toggle checkboxes */}
        <div className='flex text-sm gap-x-2'>

          {/* Password length slider */}
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length : {length}</label>
          </div>

          {/* Numbers toggle */}
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numbersAllowed}
              id='numberInput'
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          {/* Special characters toggle */}
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charsAllowed}
              id='charInput'
              onChange={() => setCharsAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Special Characters</label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
