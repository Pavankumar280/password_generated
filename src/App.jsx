/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowedNumbers, setAllowedNumbers] = useState(false);
  const [allowCharacters, setAllowCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    console.log(str.length);
    let num = "0123456789";
    if (allowCharacters) str += "!@#$%^&*()_+=-{}[]|:;<>,.?/~`";
    if (allowedNumbers) str += num;
    for (let index = 1; index <= length; index++) {
      let randomNumber = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomNumber);
    }
    setPassword(pass);
  }, [length, allowedNumbers, allowCharacters]);
  useEffect(() => {
    generatePassword();
  }, [length, allowCharacters, allowedNumbers]);
  const copyPassword = useCallback(() => {
    passwordRef.current.select();
    navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='h-[460px] border-2 rounded-md border-[#e7ea45] w-[400px] p-4'>
        <h1 className='text-2xl font-semibold text-center mt-4 text-[#e7ea45]'>
          Password Generator
        </h1>
        <input
          type='text'
          name='text'
          id='text'
          className=' mt-6 p-4 w-full outline-none border border-[#11F3Fc] bg-[#00181a] text-[#e7ea45] tracking-[5px] font-medium  '
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          readOnly
          ref={passwordRef}
        />
        <h2 className='text-lg font-medium mb-2  mt-6 text-[#e7ea45]'>
          Password Length {length}
        </h2>
        <input
          type='range'
          name='range'
          id='range'
          min={8}
          max={100}
          value={length}
          onChange={(event) => setLength(Number(event.target.value))}
          className='appearance-none w-full bg-[#11F3Fc] rounded-md accent-[#e7ea45]  h-1'
        />
        <h2 className='text-lg font-medium mb-3  mt-6 text-[#e7ea45]'>
          Characters Used
        </h2>
        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex items-center text-white mt-4'>
            <input
              type='checkbox'
              id='custom-checkbox1'
              className='opacity-0 absolute peer'
              onChange={() => setAllowedNumbers((pre) => !pre)}
              value={allowedNumbers}
            />
            <div className='w-6 h-6 bg-[#00181a] border-2 border-[#e7ea45]    peer-checked:bg-[#e7ea45] cursor-pointer transition'></div>
            <label htmlFor='custom-checkbox1' className='ml-2'>
              Numbers
            </label>
          </div>
          <div className='flex items-center text-white mt-4'>
            <input
              type='checkbox'
              id='custom-checkbox'
              className='opacity-0 absolute peer'
              onChange={() => setAllowCharacters((pre) => !pre)}
              value={allowCharacters}
            />
            <div className='w-6 h-6 bg-[#00181a] border-2 border-[#e7ea45]    peer-checked:bg-[#e7ea45] cursor-pointer transition'></div>
            <label htmlFor='custom-checkbox' className='ml-2'>
              Characters
            </label>
          </div>
        </div>
        <button
          onClick={copyPassword}
          className='p-4 bg-[#e7ea45] text-black font-medium w-full mt-10'
        >
          Copy Password
        </button>
      </div>
    </div>
  );
}

export default App;
