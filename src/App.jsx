import { useState } from "react";
import Input from "./components/Input/Input";
import { useTheme } from "./contexts/ThemeContext";
import "./App.css";
import { LeftIcon } from "./icons/LeftIcon";
import SearchIcon from "./icons/SearchIcon";
import InfoIcon from "./icons/InfoIcon";

function App() {
  const [value, setValue] = useState("");
  const { theme, tokens, toggleTheme } = useTheme();

  const appStyles = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "40px",
    backgroundColor: tokens.bg.default,
    color: tokens.content.primary,
    minHeight: "100vh",
  };

  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const buttonStyles = {
    padding: "8px 16px",
    borderRadius: tokens.borderRadius.input,
    border: `${tokens.borderWidth.s} solid ${tokens.border.input}`,
    background: tokens.bg["default-strong"],
    color: tokens.content.primary,
    cursor: "pointer",
    fontFamily: tokens.fontFamilies.body,
    fontSize: tokens.fontSizes.s,
  };

  const sectionStyles = {
    marginBottom: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const headingStyles = {
    color: tokens.content.primary,
    fontFamily: tokens.fontFamilies.body,
  };

  return (
    <div style={appStyles}>
      <div style={headerStyles}>
        <h1 style={headingStyles}>Input Component Demo</h1>
        <button onClick={toggleTheme} style={buttonStyles}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      <section style={sectionStyles}>
        <h2 style={headingStyles}>States</h2>

        <Input
          label="Default"
          placeholder="Placeholder text"
          leading={<LeftIcon />}
        />

        <Input
          label="Disabled"
          disabled
          placeholder="Cannot type here"
          value="Disabled value"
          onChange={() => {}}
          leading={<LeftIcon />}
        />

        <Input
          label="Error State"
          error="This field has an error"
          placeholder="Error placeholder"
          defaultValue="Invalid input"
          leading={<LeftIcon />}
        />

        <Input
          label="With Helper Text"
          helperText="This is some helpful text."
          placeholder="Start typing..."
          leading={<LeftIcon />}
        />
      </section>

      <section style={sectionStyles}>
        <h2 style={headingStyles}>Accessories</h2>

        <Input
          label="Leading Icon"
          leading={<SearchIcon />}
          placeholder="Search..."
        />

        <Input
          label="Trailing Icon"
          trailing={<InfoIcon />}
          placeholder="Enter info"
        />

        <Input
          label="Both Accessories"
          leading={<SearchIcon />}
          trailing={<InfoIcon />}
          placeholder="Search with info..."
        />
      </section>

      <section style={sectionStyles}>
        <h2 style={headingStyles}>Full Example</h2>

        <Input
          label="Email Address"
          description="We will never share your email."
          placeholder="you@example.com"
          helperText="Enter your work email."
          leading={<span>@</span>}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </section>
    </div>
  );
}

export default App;
