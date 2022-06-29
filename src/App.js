import React, { useRef, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import { GoldenLayoutComponent } from "./goldenLayoutComponent";
import { MyGoldenPanel } from "./myGoldenPanel";
import { AppContext } from "./appContext";

import { Menu } from "semantic-ui-react";

function App() {
  const [contextValue, setcontextValue] = useState("Default Value");
  const [myLayout, setMyLayout] = useState(null);
  const [contentItems, setContentItems] = useState([
    {
      title: "A react component",
      type: "react-component",
      component: "testItem",
      color: "#F15C25",
      props: { value: "I'm on the left" }
    },
    {
      title: "Another react component",
      type: "react-component",
      component: "testItem"
    },
    {
      title: "Another react component",
      type: "react-component",
      component: "testItem"
    }
  ]);

  // useEffect(() => {}, [contentItems]);

  function handleItemClick() {
    // setMyLayout(
    //   setContentItems([
    //     ...contentItems,
    //     {
    //       title: "AQUI",
    //       type: "react-component",
    //       component: "testItem"
    //     }
    //  ])
    // );

    setContentItems([
      ...contentItems,
      {
        title: "AQUI",
        type: "react-component",
        component: "testItem"
      }
    ]);

    setMyLayout(contentItems);

    console.log("Aqui", contentItems);
  }

  // handleItemClick = () => {
  //   this.state.myLayout.root.contentItems[0].addChild({
  //     title: "Is new Tab",
  //     type: "react-component",
  //     component: "testItem"
  //   });
  // };
  // state = { contextValue: "default value", myLayout: null };

  return (
    <div>
      <div>
        change context value:
        <input
          value={contextValue}
          onChange={(e) => {
            setcontextValue(e.currentTarget.value);
          }}
        />
      </div>
      <AppContext.Provider value={contextValue}>
        <Menu pointing vertical>
          <Menu.Item name="New Modal" onClick={handleItemClick} />
        </Menu>

        <GoldenLayoutComponent //config from simple react example: https://golden-layout.com/examples/#qZXEyv
          htmlAttrs={{ style: { height: "500px", width: "100%" } }}
          config={{
            content: [
              {
                type: "stack",

                content: contentItems
              }
            ]
          }}
          registerComponents={(myLayout) => {
            // this.setState({ myLayout });
            setMyLayout({ myLayout });
            myLayout.registerComponent("testItem2", MyGoldenPanel);

            myLayout.on("stateChanged", function () {
              var state = JSON.stringify(myLayout.toConfig());
              localStorage.setItem("savedState", state);
            });
          }}
        />
      </AppContext.Provider>
    </div>
  );
}

export default App;
