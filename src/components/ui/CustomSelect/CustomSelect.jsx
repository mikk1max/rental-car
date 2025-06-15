import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import icons from "../../../assets/icons.svg";

export default function CustomSelect({
  options,
  placeholder,
  value,
  onChange,
}) {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      renderValue={(selected) => {
        // console.log(selected);
        return selected
          ? typeof selected.value === "number"
            ? `To $${selected.value}`
            : selected.value
          : placeholder;
      }}
      indicator={
        <svg style={{ width: 16 }}>
          <use href={`${icons}#icon-select-tick`} />
        </svg>
      }
      sx={{
        width: 204,
        height: 44,
        backgroundColor: "var(--color-active-select)",
        border: 0,
        color: "var(--color-black)",
        fontWeight: 500,
        borderRadius: 12,
        "--Select-placeholderOpacity": 1,
        "&:hover": {
          backgroundColor: "var(--color-active-select) !important",
        },
        [`& .${selectClasses.indicator}`]: {
          color: "var(--color-black)",
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
      slotProps={{
        listbox: {
          sx: {
            maxHeight: 260,
            overflowY: "auto",
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-active-select)",
            borderRadius: "12px",
            paddingY: "4px",

            scrollbarWidth: "thin", // for Firefox
            scrollbarColor: "var(--color-grey-light) transparent",

            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--color-grey-light)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },

            // Hide scrollbar arrows/buttons in WebKit
            "&::-webkit-scrollbar-button": {
              height: "0px",
              width: "0px",
              display: "none",
              background: "transparent",
            },
          },
        },
      }}
    >
      {options.map((item, index) => (
        <Option
          key={`${item}-id`}
          value={item}
          sx={{
            color: "var(--color-grey)",
            fontWeight: 500,
            transition: "all var(--transition-style)",
            backgroundColor:
              !value && index === 0 ? "var(--your-default-bg)" : "transparent",
            "&:hover": {
              backgroundColor: "transparent !important",
            },
            "&[aria-selected='true']": {
              color: "var(--color-black)",
              backgroundColor: "transparent",
            },
            '&.MuiOption-highlighted:not([aria-selected="true"])': {
              backgroundColor: "transparent",
            },
          }}
        >
          {item}
        </Option>
      ))}
    </Select>
  );
}
