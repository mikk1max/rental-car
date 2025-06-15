import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import DatePicker from "../../components/ui/DatePicker/DatePicker";
import styles from "./BookingForm.module.css";
import { emailRegex, nameRegex } from "../../constants/regex";

const today = new Date().toISOString().split("T")[0];

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(nameRegex, "Name can only contain letters and spaces")
    .required("Name is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email format")
    .required("Email is required"),
  date: Yup.date().min(today, "Date must be today or later"),
  message: Yup.string(),
});

export default function BookingForm({
  onSubmit,
  setErrorMessage,
  setOpenSnackbar,
  setErrorSnackbar,
}) {
  const initialValues = { name: "", email: "", date: "", message: "" };

  return (
    <div className={styles.formSection}>
      <div className={styles.formHead}>
        <h3>Book your car now</h3>
        <p>Stay connected! We are always ready to help you.</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          errors,
          touched,
          setTouched,
          validateForm,
          submitForm,
          values,
          setFieldValue,
        }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <Field
                name="name"
                type="text"
                placeholder="Name*"
                className={`${styles.formInput} ${
                  touched.name && errors.name ? styles.errorField : ""
                }`}
              />
            </div>
            <div className={styles.formGroup}>
              <Field
                name="email"
                type="email"
                placeholder="Email*"
                className={`${styles.formInput} ${
                  touched.email && errors.email ? styles.errorField : ""
                }`}
              />
            </div>
            <div className={styles.formGroup}>
              <DatePicker
                value={values.date}
                onChange={(val) => setFieldValue("date", val)}
                error={touched.date && errors.date}
                placeholder="Booking date"
                minDate={new Date()}
                className={`${styles.formInput} ${
                  touched.date && errors.date ? styles.errorField : ""
                }`}
              />
            </div>
            <div className={styles.formGroup}>
              <Field
                name="message"
                as="textarea"
                placeholder="Comment"
                rows="4"
                className={`${styles.formTextArea} ${
                  touched.message && errors.message ? styles.errorField : ""
                }`}
              />
            </div>

            <CustomButton
              text="Send"
              type="button"
              preset={1}
              className={styles.submitButton}
              onClick={async () => {
                const errors = await validateForm();
                setTouched({
                  name: true,
                  email: true,
                  date: true,
                  message: true,
                });
                if (Object.keys(errors).length > 0) {
                  setErrorMessage(
                    "Please fill in all required fields correctly."
                  );
                  setErrorSnackbar(true);
                  setOpenSnackbar(true);
                } else {
                  submitForm();
                }
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
