import CircularProgress from "@mui/material/CircularProgress";

export default function CircularSize() {
  return (
    <div style={styles.loaderWrapper}>
      <CircularProgress size="3rem" />
    </div>
  );
}

const styles = {
  loaderWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999,
  },
};
