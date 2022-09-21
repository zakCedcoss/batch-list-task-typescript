import { useEffect, useState } from "react";
import "./App.css";
import Group from "./components/Group";
import { GroupType } from "./types";

function App() {
  const [groupsArray, setGroupsArray] = useState<GroupType[]>([
    {
      id: Math.floor(Math.random() * 5684567),
      rowsArray: [],
    },
  ]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let s: string = "";
    groupsArray.map((g, j) => {
      g.rowsArray?.map((r, i) => {
        const { firstSelect, secondSelect, thirdSelect } = r;
        s += `${firstSelect} ${secondSelect} ${thirdSelect}`;
        if (
          g.rowsArray?.length > 1 &&
          g.rowsArray.length - 1 !== i &&
          thirdSelect !== ""
        ) {
          s += " AND ";
        }
      });
      if (groupsArray.length > 1 && groupsArray.length - 1 !== j) {
        s += " OR ";
      }
    });

    setMessage(s);
  }, [groupsArray]);

  const handleSetGroupsArray = (data: GroupType[]) => {
    setGroupsArray(data);
  };

  const handleAddGroup = (): void => {
    const newGroup: GroupType = {
      id: Math.floor(Math.random() * 5684567),
      rowsArray: [],
    };
    setGroupsArray([...groupsArray, newGroup]);
  };

  // console.log(groupsArray);
  console.log(message);

  return (
    <div className="App">
      <div className="group-head">{message}</div>
      <button onClick={handleAddGroup}>Add Group</button>
      {groupsArray.map((group) => {
        return (
          <Group
            key={group.id}
            group={group}
            groupsArray={groupsArray}
            handleSetGroupsArray={handleSetGroupsArray}
          />
        );
      })}
    </div>
  );
}

export default App;
