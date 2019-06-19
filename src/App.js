/**
 * Author: Ken Labso
 * Date: June 18, 2019
 * Description: Robot on a table simulator.
 **/
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  //Initialized state variables
  state = {
    value: "",
    location: null,
    facing: { x: 0, y: 0 },
    isPlaced: false,
    actions: []
  };
  //Upon clicking reset
  handleReset = () => {
    //Reset state variables
    this.setState({
      value: "",
      location: null,
      facing: { x: 0, y: 0 },
      isPlaced: false,
      actions: []
    });
  };
  //Upon clicking Enter
  handleOnEnter = () => {
    const { value, isPlaced } = this.state;
    //Split by space and comma
    const inputArray = value.split(/[\s,]+/);
    //Check if the first word is a valid command
    const command = inputArray[0];
    if (command === "PLACE") {
      //Check if the input is a valid command for PLACE
      if (inputArray.length === 4) {
        const orientation = {
          NORTH: { x: 0, y: 1 },
          SOUTH: { x: 0, y: -1 },
          WEST: { x: -1, y: 0 },
          EAST: { x: 1, y: 0 }
        };
        const x = +inputArray[1], y = +inputArray[2], f = inputArray[3], facing = orientation[f];
        // Check if the robot is still on the table, and valid direction
        if (x > -1 && x < 5 && y > -1 && y < 5 && facing) {
          this.setState(prevState => ({
            location: { x, y },
            facing,
            isPlaced: true,
            actions: [...prevState.actions, `PLACE ${x},${y},${f}`]
          }));
        }
      }
    }
    // Ignore everything else until robot is placed
    if (isPlaced) {
      const { facing, location } = this.state;
      if (command === "MOVE") {
        const nextX = location.x + facing.x;
        const nextY = location.y + facing.y;
        // Make sure the robot won't fall off the table
        if (nextX > -1 && nextX < 5 && nextY > -1 && nextY < 5) {
          this.setState(prevState => ({
            location: {
              x: prevState.location.x + prevState.facing.x,
              y: prevState.location.y + prevState.facing.y
            },
            actions: [...prevState.actions, "MOVE"]
          }));
        }
      } else if (command === "LEFT") {
        this.setState(prevState => ({
          facing: {
            x: -prevState.facing.y,
            y: prevState.facing.x
          },
          actions: [...prevState.actions, "LEFT"]
        }));
      } else if (command === "RIGHT") {
        this.setState(prevState => ({
          facing: {
            x: prevState.facing.y,
            y: -prevState.facing.x
          },
          actions: [...prevState.actions, "RIGHT"]
        }));
      } else if (command === "REPORT") {
        //Reference of direction for the output
        const direction = {
          x: {
            "0": {
              y: {
                "1": "NORTH",
                "-1": "SOUTH"
              }
            },
            "1": {
              y: {
                "0": "EAST"
              }
            },
            "-1": {
              y: {
                "0": "WEST"
              }
            }
          }
        };
        const output = `Output: ${location.x},${location.y},${direction.x[facing.x.toString()].y[facing.y.toString()]}`;
        this.setState(prevState => ({
          actions: [...prevState.actions, "REPORT", output]
        }));
      }
    }
    // Reset value in input
    this.setState({ value: "" });
  }
  //Update this.state.value on onChange event of input box
  handleOnChange = e => {
    this.setState({
      value: e.target.value.toUpperCase()
    });
  };
  render() {
    const { actions, value, isPlaced } = this.state;
    return (
      <div className="app-container">
        <h1>Robot on Table Simulator</h1>
        <input
          className="command-box"
          onKeyPress={e => e.charCode === 13 && this.handleOnEnter()}
          onChange={this.handleOnChange}
          value={value}
          placeholder="Enter command here..."
        />
        {isPlaced && (
          <button className="reset-button" onClick={this.handleReset}>RESET</button>
        )}
        {isPlaced && (
          <div className="action-list">
            <ul>
              {actions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
};

export default App;