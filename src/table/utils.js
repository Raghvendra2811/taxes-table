export const columns = [
  {
    displayName: "Entity",
    id: "id",
    valueKey: "name",
    columnType: "text",
    xsValue: 3,
  },
  {
    displayName: "Gender",
    id: "id",
    valueKey: "gender",
    columnType: "chip",
    xsValue: 3,
  },
  {
    displayName: "Request Date",
    id: "id",
    valueKey: "createdAt",
    columnType: "date",
    xsValue: 3,
  },
  {
    displayName: "Country",
    id: "id",
    valueKey: "country",
    columnType: "dropdown",
    xsValue: 3,
  },
];

export function formatDateToShortMonth(inputDateStr) {
  const date = new Date(inputDateStr);

  const options = {
    month: "short", // 'Jan', 'Feb', etc.
    day: "2-digit",
    year: "numeric",
    timeZone: "Asia/Kolkata", // Ensure IST timezone
  };

  // Format the date to 'Jan 20, 2025'
  return date.toLocaleDateString("en-US", options);
}

export const styles = {
  compColumnStyle: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #F3F3F5",
    borderLeft: "1px solid #F3F3F5",
  },
  headerColumnStyle: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #B8B5C2",
    borderLeft: "1px solid #B8B5C2",
  },
  filterIconStyle: {
    color: "#5622FF",
    fontSize: "28px",
    cursor: "pointer",
    position: "absolute",
    top: "16px",
    right: "16px",
    backgroundColor: "#fff",
  },
  popoverStyle: {
    "& .MuiPaper-root": {
      width: "300px",
      maxHeight: "300px",
      overflowY: "auto",
    },
  },
  popoverItemStyle: {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F3F3F5",
    },
  },
};
