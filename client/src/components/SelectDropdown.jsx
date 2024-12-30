import React from "react";

const SelectDropdown = ({ data, valueField, displayField, onChange }) => {
	return (
		<select className="room-select-dropdown" onChange={onChange} disabled={!data || !data.length}>
			<option value="" selected disabled hidden>
				{!data || !data.length ? "No Room Present" : "Choose Room Name"}
			</option>
			{data.map((ele) => (
				<option value={ele[valueField]}>{ele[displayField]}</option>
			))}
		</select>
	);
};
export default SelectDropdown;
