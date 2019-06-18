# Robot on Table Simulator

The application is a simulation of a robot moving on a square table top, of dimensions 5 units x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction.

## Getting Started

Below are some simple instructions to make sure you're able to run this project.

### Prerequisites

To run this, you will need to have Nodejs installed to use npm. Once you've navigated to the folder with the project, run the action below.

```
npm i
```

This will allow your computer to download all the dependencies I use throughout the project.

### Running the Program

To run the Toy Robot Simulation game, you will need to run the following command

```
npm start
```

This will open a tab in your default browser with the `http://localhost:3000` as the address.

## How to Play the Game

These are the following commands for this game:

- PLACE X,Y,F
- MOVE
- LEFT
- RIGHT
- REPORT

Once one of these valid commands are typed into the input at the top of the page, the command will be executed. Read below for details on each command.

### PLACE X,Y,F

The **PLACE X,Y,F** command places our robot onto the board. Valid X and Y values range from 0 to 5. Any other value will be ignored because of the robot's advanced AI.

F stands for what direction the robot is facing. The valid facing directions are:

- North
- East
- South
- West

All other actions specified above cannot be executed until the robot is placed on the tabletop.

You are allowed to re-place the robot at any time.

### MOVE

The **MOVE** command moves the robot one unit forward in the direction it is facing. If the move moves the robot off the board, the command is ignored.

### LEFT

The **LEFT** command changes the direction the robot is facing by 90 degrees to the left.

For example, if facing North and given the LEFT command, the robot will now be facing West.

### RIGHT

The **RIGHT** command changes the direction the robot is facing by 90 degrees to the right.

For example, if facing North and given the RIGHT command, the robot will now be facing East.

### REPORT

The **REPORT** command prints the current location of the robot to the screen.

## Test Data

Here are some examples of commands to give to the robot, and the corresponding output.

```
    PLACE 4,4,NORTH
    MOVE
    LEFT
    MOVE
    MOVE
    LEFT
    MOVE
    RIGHT
    MOVE
    REPORT
    Output: 1,3,WEST
```

First MOVE does not register, so the robot does not move one unit forward. In total, there are 3 moves to the left and 1 moves down, moving our robot to 1,1. Our robot ends up facing WEST due to the turns.

```
    PLACE 3,3,WEST
    MOVE
    MOVE
    MOVE
    RIGHT
    REPORT
    Output: 0,3,NORTH
```

Our robot moves three units WEST, and then turns right, giving it the output of 0,3,NORTH.