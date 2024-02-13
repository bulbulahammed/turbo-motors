/* eslint-disable @typescript-eslint/no-unused-vars */

type IFilterDropDown = {
  optionLabel: string;
  items: string[];
  handleFilterValue: (value: string) => void;
};

export default function FilterDropDown({
  optionLabel,
  items,
  handleFilterValue,
}: IFilterDropDown) {
  return (
    <select
      className="select select-bordered w-full max-w-xs  outline-none hover:outline-none focus:outline-none"
      onChange={(e) => handleFilterValue(e.target.value)}
      value={optionLabel}
    >
      <option disabled>{optionLabel}</option>
      {items?.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
