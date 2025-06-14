import clsx from "clsx";
import s from "./CustomButton.module.css";

export default function CustomButton({
  text,
  className,
  onClick,
  preset = 0,
  type = "button",
  disabled = false,
  children,
}) {
  const content = children || text;

  const baseProps = {
    className: clsx(s.basicBtnStyles, className),
    onClick,
    type,
    disabled,
  };

  switch (preset) {
    case 1:
      return (
        <button
          {...baseProps}
          className={clsx(baseProps.className, s.filledButton)}
        >
          {content}
        </button>
      );
    case 2:
      return (
        <button
          {...baseProps}
          className={clsx(baseProps.className, s.borderedButton)}
        >
          {content}
        </button>
      );
    default:
      return <button {...baseProps}>{content}</button>;
  }
}
