import {
  Card,
  FormControl,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import { lightGreen } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { TypeAnimation } from "react-type-animation";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

let promptArray = [];

function App() {
  const [prompt, setPrompt] = useState([]);
  const promptRef = useRef(null);

  const outerTheme = useTheme();
  const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              "& label.Mui-focused": {
                color: "lightBlue",
              },
            },
          },
        },

        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: "grey",
              borderRadius: "16px",
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "blue",
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "green",
              },
            },
          },
        },
      },
    });
  function sendPromptHandler() {
    let promptRecieved = promptRef.current.value;
    if (!promptRecieved) {
      console.log("no value");
    } else {
      console.log(promptRef.current.value);
      promptArray.unshift(promptRecieved);
      setPrompt([...promptArray]);
      console.log(promptArray);
    }
    promptRef.current.value = null;
  }

  useEffect(() => {
    console.log("triggered");
    promptArray = [];
  }, []);

  useEffect(() => {
    sendPromptHandler();
  }, [prompt]);
  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          backgroundColor: "#424242",
        }}
      >
        <Stack
          sx={{ width: "80%", height: "80vh" }}
          justifyContent={"space-evenly"}
          spacing={2}
        >
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Welcome to chat bot ",
              2000, // wait 1s before replacing "Mice" with "Hamsters"
              "Write your Prompts ",
              2000,
              "Langchain.js integartion coming soon",
              2000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2rem", display: "inline-block" }}
            repeat={4}
          />

          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Stack spacing={4} width={"100%"}>
              {prompt?.map((value, index) => {
                return (
                  <Stack
                    key={index}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "lightGrey" : "darkGrey",
                      borderRadius: "16px",
                    }}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={1}
                    p={2}
                  >
                    <Card>
                      <Typography
                        sx={{ textWrap: "break-word", width: "50vw" }}
                        p={2}
                      >
                        {value}
                      </Typography>
                      <Avatar
                        alt="user"
                        src="https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      />
                    </Card>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
              inputRef={promptRef}
              autoComplete="off"
              fullWidth
              id="input-with-icon-textfield"
              label="Type your prompts....."
              onKeyDown={(event) => {
                event.key === "Enter" && sendPromptHandler();
              }}
              onChange={(event) => {}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon
                      className="sendButton"
                      onClick={sendPromptHandler}
                    />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </ThemeProvider>
        </Stack>
      </Box>
    </div>
  );
}

export default App;
