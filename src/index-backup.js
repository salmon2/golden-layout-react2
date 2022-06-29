import React from "react";
import { render } from "react-dom";
import { GoldenLayoutComponent } from "./goldenLayoutComponent";
import { MyGoldenPanel } from "./myGoldenPanel";
import { AppContext } from "./appContext";
import "semantic-ui-css/semantic.min.css";
import { Menu } from "semantic-ui-react";

class App extends React.Component {
  handleItemClick = () => {
    this.state.myLayout.root.contentItems[0].addChild({
      title: "Is new Tab",
      type: "react-component",
      component: "testItem"
    });
  };
  state = { contextValue: "default value", myLayout: null };
  render() {
    return (
      <div>
        <h2>GoldenLayout patched with React Portals:</h2>
        <div>
          change context value:
          <input
            value={this.state.contextValue}
            onChange={e => {
              this.setState({ contextValue: e.target.value });
            }}
          />
        </div>
        <AppContext.Provider value={this.state.contextValue}>
          <Menu pointing vertical>
            <Menu.Item name="messages" onClick={e => this.handleItemClick()} />
            <Menu.Item name="friends" onClick={e => this.handleItemClick()} />
          </Menu>

          <GoldenLayoutComponent //config from simple react example: https://golden-layout.com/examples/#qZXEyv
            htmlAttrs={{ style: { height: "500px", width: "500px" } }}
            config={{
              content: [
                {
                  type: "stack",
                  content: [
                    {
                      title: "A react component",
                      type: "react-component",
                      component: "testItem",
                      props: { value: "I'm on the left" }
                    },
                    {
                      title: "Another react component",
                      type: "react-component",
                      component: "testItem"
                    }
                  ]
                }
              ]
            }}
            registerComponents={myLayout => {
              this.setState({ myLayout });
              myLayout.registerComponent("testItem", MyGoldenPanel);
            }}
          />
        </AppContext.Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
