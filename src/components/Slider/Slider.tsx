import React from "react";

type SliderProps = {
  id: string | number;
  label: string;
  min: number;
  max: number;
  color: string;
  value: number;
  onSlide: (v: number) => void;
}

const Slider = ({ id, label, min, max, color, value, onSlide }: SliderProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={`slider-${id}`} className="form-label ">
        {`${label}${value}`}
      </label>
      <input
        id={`slider-${id}`}
        type="range"
        className={`form-range accent-${color}-500 w-full h-6 p-0 focus:outline-none focus:ring-0 focus:shadow-none`}
        value={value}
        min={min}
        max={max}
        onChange={e => onSlide(parseInt(e.target.value))}
        onMouseMove={e => onSlide(parseInt((e.target as HTMLInputElement).value))}
      />
    </div>
  );
};

export default Slider;
