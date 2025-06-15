import ReactDatePicker, { registerLocale } from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import { parse, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import icons from "../../../assets/icons.svg";

const customEnLocale = {
  ...enUS,
  options: { ...enUS.options, weekStartsOn: 1 },
  localize: {
    ...enUS.localize,
    dayShort: (dayIndex) => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return days[dayIndex];
    },
  },
};

registerLocale("en-custom", customEnLocale);

function parseDateFromString(dateString) {
  if (!dateString) return null;
  return parse(dateString, "yyyy-MM-dd", new Date());
}

const PrevIcon = () => (
  <svg
    style={{
      width: 18,
      height: 18,
      transform: "rotate(90deg)",
      fill: "var(--color-primary)",
    }}
  >
    <use href={`${icons}#icon-select-tick`} />
  </svg>
);

const NextIcon = () => (
  <svg
    style={{
      width: 18,
      height: 18,
      transform: "rotate(-90deg)",
      fill: "var(--color-primary)",
    }}
  >
    <use href={`${icons}#icon-select-tick`} />
  </svg>
);

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  minDate,
  className,
}) {
  return (
    <ReactDatePicker
      selected={value ? parseDateFromString(value) : null}
      onChange={(date) => onChange(date ? format(date, "yyyy-MM-dd") : "")}
      minDate={minDate}
      placeholderText={placeholder}
      className={className}
      dateFormat="yyyy-MM-dd"
      isClearable
      locale="en-custom"
      formatWeekDay={(dayName) => {
        const map = {
          Mo: "Mon",
          Tu: "Tue",
          We: "Wed",
          Th: "Thu",
          Fr: "Fri",
          Sa: "Sat",
          Su: "Sun",
        };
        const key = dayName.slice(0, 2);
        return map[key] || dayName;
      }}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            marginLeft: 12,
            marginRight: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            type="button"
            aria-label="Previous Month"
            style={{
              background: "none",
              border: "none",
              cursor: prevMonthButtonDisabled ? "not-allowed" : "pointer",
              visibility: prevMonthButtonDisabled ? "hidden" : "visible",
            }}
          >
            <PrevIcon />
          </button>

          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 1.2,
              color: "var(--color-black)",
            }}
          >
            {date.toLocaleString("en-US", { month: "long", year: "numeric" })}
          </div>

          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            type="button"
            aria-label="Next Month"
            style={{
              background: "none",
              border: "none",
              cursor: nextMonthButtonDisabled ? "not-allowed" : "pointer",
            }}
          >
            <NextIcon />
          </button>
        </div>
      )}
    />
  );
}
