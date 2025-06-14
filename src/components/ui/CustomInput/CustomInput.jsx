import Input from "@mui/joy/Input";

export default function CustomInput({
  placeholder,
  className,
  value,
  onChange,
}) {
  return (
    <Input
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      type="number"
      sx={{
        width: 160,
        height: 44,
        backgroundColor: "var(--color-active-select)",
        border: 0,
        fontWeight: 500,
        color: "var(--color-black)",
        "&::before": {
          content: '""',
          position: "absolute",
          border: "1.5px solid var(--color-primary)",
          transform: "scaleX(0)",
          left: "2.5px",
          right: "2.5px",
          bottom: 0,
          top: "unset",
          transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
          borderRadius: 0,
          borderBottomLeftRadius: "64px 20px",
          borderBottomRightRadius: "64px 20px",
          pointerEvents: "none",
        },
        "&:focus-within::before": {
          transform: "scaleX(1)",
        },
        "& input::placeholder": {
          opacity: 1,
        },
      }}
    />
  );
}
