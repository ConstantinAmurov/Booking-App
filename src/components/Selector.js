import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Selector = ({ placeholder, options, customTheme }) => {
  const [state, setState] = useState();
  function customThemeTemplate(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: "orange",
      },
    };
  }
  return (
    <div style={{ marginBottom: "24px" }}>
      <p style={{ marginBottom: "4px" }}>{placeholder}</p>
      <Select
        onChange={setState}
        options={options}
        theme={customThemeTemplate}
        placeHolder="Selector"
        noOptionsMessage={() => "No " + placeholder + "'s " + "to select"}
        isSearchable
      ></Select>
    </div>
  );
};

export default Selector;
