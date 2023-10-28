import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme"; // Path to your theme file
import TasksAutomation from "./components/tasksAutomation/TasksAutomation";
import WaveComponent from "./components/exercises/wave";
import OpenAi from "./components/open_AI_API/Open_AI_API";
import ChatComponent from "./components/chat/chat";
import { Container, CssBaseline, Grid, Paper } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ paddingTop: "24px" }}></div>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* First section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <OpenAi />
            </Paper>
          </Grid>

          {/* Third section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <ChatComponent />
            </Paper>
          </Grid>
        </Grid>

        {/* Second section */}
        {/* <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <WaveComponent />
          </Paper>
        </Grid> */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
