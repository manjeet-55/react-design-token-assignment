import { useState, useEffect } from "react";
import Input from "./components/Input/Input";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Placeholder icons for demo
  const SearchIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  const InfoIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Input Component Demo</h1>
        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid var(--color-border-default)",
            background: "var(--color-surface-alternate)",
            color: "var(--color-text-primary)",
            cursor: "pointer",
          }}
        >
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>

      <section
        style={{
          marginBottom: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h2>States</h2>

        <Input label="Default" placeholder="Placeholder text" />

        <Input
          label="Disabled"
          disabled
          placeholder="Cannot type here"
          value="Disabled value"
          onChange={() => {}}
        />

        <Input
          label="Error State"
          error="This field has an error"
          placeholder="Error placeholder"
          defaultValue="Invalid input"
        />

        <Input
          label="With Helper Text"
          helperText="This is some helpful text."
          placeholder="Start typing..."
        />
      </section>

      <section
        style={{
          marginBottom: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h2>Accessories</h2>

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

      <section
        style={{
          marginBottom: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h2>Full Example</h2>

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
