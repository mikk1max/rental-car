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
        "--Select-placeholderOpacity": 1,
        [`& .${selectClasses.indicator}`]: {
          color: "var(--color-black)",
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
    >
      {options.map((item) => (
        <Option key={`${item}-id`} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
}
