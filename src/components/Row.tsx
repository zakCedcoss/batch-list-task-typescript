import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { RowType } from "../types";

type RowProps = {
  row: RowType;
  rowsArray: RowType[];
  handleSetRowsArray: (data: RowType[]) => void;
  isError: Boolean;
};

function Row({ row, rowsArray, handleSetRowsArray, isError }: RowProps) {
  const selectOne = ["A", "B", "C", "D", "E"];
  const selectTwo = [
    "Equals",
    "Not Equals",
    "Contains",
    "Not Contains",
    "Start",
  ];
  const selectThree = ["V", "W", "X", "Y", "Z"];

  const [firstSelect, setFirstSelect] = useState<string>("");
  const [secondSelect, setSecondSelect] = useState<string>("");
  const [thirdSelect, setThirdSelect] = useState<string>("");

  const [isFirstEmpty, setIsFirstEmpty] = useState<Boolean>(true);
  const [isSecondEmpty, setIsSecondEmpty] = useState<Boolean>(true);
  const [isThirdEmpty, setIsThirdEmpty] = useState<Boolean>(true);
  //   console.log(firstSelect, secondSelect, thirdSelect);
  //   console.log(row);

  const handleRowDelete = () => {
    const newRowsArray: RowType[] = rowsArray.filter(
      (rowEle: RowType) => rowEle.id !== row.id
    );
    handleSetRowsArray(newRowsArray);
  };

  const handleValueChange = (name: string, value: string) => {
    console.log(name, value);
    if (name === "firstSelect") {
      setFirstSelect(value);
      setSecondSelect("");
      setThirdSelect("");
      if (value === "") {
        setIsFirstEmpty(true);
      } else {
        setIsFirstEmpty(false);
      }
      setIsSecondEmpty(true);
      setIsThirdEmpty(true);
    }
    if (name === "secondSelect") {
      setSecondSelect(value);
      setThirdSelect("");
      if (value === "") {
        setIsSecondEmpty(true);
      } else {
        setIsSecondEmpty(false);
      }
      setIsThirdEmpty(true);
    }
    if (name === "thirdSelect") {
      setThirdSelect(value);
      if (value === "") {
        setIsThirdEmpty(true);
      } else {
        setIsThirdEmpty(false);
      }
    }
  };

  useEffect(() => {
    const updatedRow: RowType = {
      ...row,
      firstSelect,
      secondSelect,
      thirdSelect,
    };
    const updatedRowsArray: RowType[] = rowsArray.map((rowObj: RowType) => {
      if (rowObj.id === row.id) {
        return { ...rowObj, ...updatedRow };
      }
      return rowObj;
    });
    // console.log(updatedRowsArray);
    handleSetRowsArray(updatedRowsArray);
  }, [firstSelect, secondSelect, thirdSelect]);

  return (
    <div className="row">
      <p>Row ID: {row.id}</p>
      <div className="dropdown-selection">
        <div className="dropdown">
          <p>Select By</p>
          <select
            className={isError && isFirstEmpty ? "error-box" : ""}
            name="firstSelect"
            onChange={(e) => handleValueChange(e.target.name, e.target.value)}
            value={firstSelect}
          >
            <option value="">Select</option>
            {selectOne.map((opt, i) => {
              return (
                <option value={opt} key={i}>
                  {opt}
                </option>
              );
            })}
          </select>
        </div>
        <div className="dropdown">
          <p>Select By</p>
          <select
            className={isError && isSecondEmpty ? "error-box" : ""}
            name="secondSelect"
            onChange={(e) => handleValueChange(e.target.name, e.target.value)}
            value={secondSelect}
          >
            <option value="">Select</option>
            {selectTwo.map((opt, i) => {
              return (
                <option value={opt} key={i}>
                  {opt}
                </option>
              );
            })}
          </select>
        </div>
        <div className="dropdown">
          {secondSelect === "Equals" ? (
            <select
              className={isError && isThirdEmpty ? "error-box" : ""}
              name="thirdSelect"
              onChange={(e) => handleValueChange(e.target.name, e.target.value)}
              value={thirdSelect}
            >
              <option value="">Select</option>
              {selectThree.map((opt, i) => {
                return (
                  <option value={opt} key={i}>
                    {opt}
                  </option>
                );
              })}
            </select>
          ) : (
            <>
              <p>Value</p>
              <input
                className={isError && isThirdEmpty ? "error-box" : ""}
                type="text"
                name="thirdSelect"
                value={thirdSelect}
                onChange={(e) =>
                  handleValueChange(e.target.name, e.target.value)
                }
              />
            </>
          )}
        </div>
        <div className="dropdown">
          {rowsArray.length !== 1 && (
            <div className="delete" onClick={handleRowDelete}>
              <FaTrash />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Row;
