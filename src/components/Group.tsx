import { useEffect, useState } from "react";
import Row from "./Row";
import { GroupType, RowType } from "../types";

type GroupProps = {
  group: GroupType;
  groupsArray: GroupType[];
  handleSetGroupsArray: (data: GroupType[]) => void;
  isError: Boolean;
};

function Group({
  group,
  groupsArray,
  handleSetGroupsArray,
  isError,
}: GroupProps) {
  const [rowsArray, setRowsArray] = useState<RowType[]>([
    {
      id: Math.floor(Math.random() * 554861277),
      firstSelect: "",
      secondSelect: "",
      thirdSelect: "",
    },
  ]);

  useEffect(() => {
    const updatedGroupsArray: GroupType[] = groupsArray.map(
      (groupObj: GroupType) => {
        if (groupObj.id === group.id) {
          return { ...groupObj, rowsArray };
        }
        return groupObj;
      }
    );

    // console.log(updatedGroupsArray);
    handleSetGroupsArray(updatedGroupsArray);
  }, [rowsArray]);

  const handleSetRowsArray = (data: RowType[]) => {
    setRowsArray(data);
  };

  const handleAddRow = (): void => {
    const newRow: RowType = {
      id: Math.floor(Math.random() * 55486127),
      firstSelect: "",
      secondSelect: "",
      thirdSelect: "",
    };
    setRowsArray([...rowsArray, newRow]);
  };

  const handleGroupDelete = (): void => {
    const updatedGroupsArray: GroupType[] = groupsArray.filter(
      (groupEle: GroupType) => groupEle.id !== group.id
    );
    handleSetGroupsArray(updatedGroupsArray);
  };

  //   console.log(rowsArray);

  return (
    <div className="group">
      <button onClick={handleAddRow}>Add Row</button>
      {rowsArray.map((row) => {
        return (
          <Row
            key={row.id}
            row={row}
            rowsArray={rowsArray}
            handleSetRowsArray={handleSetRowsArray}
            isError={isError}
          />
        );
      })}
      <p>Group ID: {group.id}</p>
      {groupsArray.length !== 1 && (
        <button onClick={handleGroupDelete}>Delete Group</button>
      )}
    </div>
  );
}

export default Group;
