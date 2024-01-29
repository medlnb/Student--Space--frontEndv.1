import { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { IoRemoveOutline } from "react-icons/io5";
import './DropDown.css';

function DropDown({ list }: { list: string[] }) {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setShow(false)
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside)

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [])

  return (
    <div className='dropdown--container' ref={dropdownRef}>
      <div
        style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
        onClick={() => setShow((prev) => !prev)}>
        {list[0]}
        {show ?
          <IoRemoveOutline />
          :
          <FaChevronDown />}
      </div>
      {show && (
        <div className='dropdown--list'>
          {list.map((element, index) => (
            <p key={index}>{element}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
