import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import axios from "axios";

const BasicRating = ({ uniqueId }) => {
  const storedValue = localStorage.getItem(`ratingValue_${uniqueId}`);
  const storedIsDisabled = localStorage.getItem(`isDisabled_${uniqueId}`);

  const [value, setValue] = React.useState(
    storedValue ? JSON.parse(storedValue) : 2
  );
  const [isDisabled, setIsDisabled] = React.useState(
    storedIsDisabled ? JSON.parse(storedIsDisabled) : false
  );

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);

    axios
      .post("http://localhost:8081/home/rateOrder", {
        orderId: uniqueId,
        orderRate: newValue,
      })
      .then((response) => {
        console.log("Order rated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error rating order", error);
      });
    handleToggleDisabled();
  };

  const handleToggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  React.useEffect(() => {
    localStorage.setItem(`ratingValue_${uniqueId}`, JSON.stringify(value));
    localStorage.setItem(`isDisabled_${uniqueId}`, JSON.stringify(isDisabled));
  }, [value, isDisabled, uniqueId]);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name={`simple-controlled_${uniqueId}`}
        value={value}
        onChange={handleRatingChange}
        size="large"
        disabled={isDisabled}
      />
    </Box>
  );
};

export default BasicRating;
