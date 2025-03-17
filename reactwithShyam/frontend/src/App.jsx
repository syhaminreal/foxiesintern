import React, { useCallback, useState } from 'react';
import "tailwindcss";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()[]{}`';

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length); // Fix the random index
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded px-4 m-8 text-orange-500 bg-gray-500 text-center my-3">
      Password Generator
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-3 px-3"
          placeholder="password"
          readOnly
        />
      </div>
      <button
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        onClick={() => navigator.clipboard.writeText(password)} // Copy to clipboard
      >
        Copy
      </button>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={15}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          <label>Include Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
          />
          <label>Include Special Characters</label>
        </div>
      </div>

      <button
        className="mt-4 bg-green-500 text-white px-3 py-1"
        onClick={passwordGenerator}
      >
        Generate Password
      </button>
    </div>
  );
}

export default App;


// password ref= current object status or condition 
// to allow user to know if his effects on the copy are done or not 
// passwordRef.current?.select()
// passwordref.current?.setselctionRange(0,9) range form where to slect to form


//usecallback memororizes the function it mght br the complete or the part of the function
// so memory and other data can be stored


// use effect cleanup funtion


// useref hook
// password ref =use ref(null) i fnot passed finds the input feild
// // const copyPasswordtocilpboard =usecallback(()=>{
//   window.navigator.clipboard.writeText(password)}, [password])