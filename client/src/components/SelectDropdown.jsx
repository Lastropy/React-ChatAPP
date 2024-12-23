import React from "react";

const SelectDropdown = ({ data, valueField, displayField, onChange }) => {
	return (
		<select className="room-select-dropdown" onChange={onChange}>
			{data.map((ele) => (
				<option value={ele[valueField]}>{ele[displayField]}</option>
			))}
		</select>
	);
};
export default SelectDropdown;
