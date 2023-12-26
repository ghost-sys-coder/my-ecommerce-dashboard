/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {SketchPicker} from "react-color"
import { FaTimes, FaTrash, FaPlus } from "react-icons/fa";

function Color({ setProductData, Color }) {
  const [color, setColor] = useState('#fff');
  const [open, setOpen] = useState(false);

  const colorArray = Color.split(',');
  const [selectedColors, setSelectedColors] = useState(colorArray);

  if (colorArray.length <= 0) {
    setSelectedColors([])
  }

  const handleColorButtonClick = () => {
    setSelectedColors((prevColors) => [
      ...prevColors,
      color
    ]);
    setOpen(false);
  }

  /** update colors */
  useEffect(() => {
    const handleSelectedColors = () => {
      setProductData((prevFormData) => ({
        ...prevFormData,
        colors: selectedColors.join(",")
      }))
    }
    handleSelectedColors();
  }, [selectedColors, setProductData]);

  /** handle color delete */
  const handleDeleteColor = (index) => {
    setSelectedColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors.splice(index, 1);
      return updatedColors
    })
  }

  return (
    <div className="mt-4">
    <div className="flex items-center justify-between">
        <button
            onClick={()=> setOpen(!open)}
            type='button'
            className='block border-[1px] rounded-lg px-3 text-[14px] bg-primary-500 text-light-1 font-poppins py-1 px-3'>
            Choose a Color
        </button>
        <button
            onClick={handleColorButtonClick}
            type='button'
            className='flex items-center space-x-1 border-[1px] rounded-lg p-1 px-3 text-[14px] text-light-1 font-poppins bg-primary-600'>
                Add
                <FaPlus className='ml-1' size={16} />
            </button>
    </div>
      <div className='mt-5 flex gap-2 justify-start items-start'>
      {open && (
            <SketchPicker
                color={color}
                onChange={(color)=> setColor(color.hex)}
            />
        )}
        {selectedColors.map((selectedColor, index) => (
            <div key={index} className='flex flex-col items-center gap-2 justify-start items-start'>
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "100%",
                        backgroundColor: selectedColor,
                        display: "inline-block"
                    }}>
                </div>
                <span className='border-[1px] rounded-lg p-1 px-3 text-[14px] bg-white font-mono'>{selectedColor}</span>
                <button
                    type='button'
                    className='border-[1px] rounded-lg p-1 px-3 text-[14px] text-light-1 bg-red-600'
                    onClick={()=> handleDeleteColor(index)}
                >
                    Delete
                </button>
            </div>
        ))}
    </div>
</div>
  );
}

export default Color;
