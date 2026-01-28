import Input from "../components/Input/Input";
import SearchIcon from "../icons/SearchIcon";
import InfoIcon from "../icons/InfoIcon";
import { ThemeProvider } from "../contexts/ThemeContext";

export default {
  title: "Components/Input",
  component: Input,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: "20px", maxWidth: "600px" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: [""],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the input",
    },
    description: {
      control: "text",
      description: "Description text shown below the label",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    helperText: {
      control: "text",
      description: "Helper text shown below the input",
    },
    error: {
      control: "text",
      description: "Error message (or boolean to show error state)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    leading: {
      control: false,
      description: "Leading icon or element",
    },
    trailing: {
      control: false,
      description: "Trailing icon or element",
    },
  },
};

// Default state
export const Default = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
};

// With description
export const WithDescription = {
  args: {
    label: "Email Address",
    description: "We'll never share your email with anyone else.",
    placeholder: "you@example.com",
  },
};

// With helper text
export const WithHelperText = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "Choose a unique username between 3-20 characters.",
  },
};

// Error state
export const ErrorState = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: "Please enter a valid email address",
    defaultValue: "invalid-email",
  },
};

// Disabled state
export const Disabled = {
  args: {
    label: "Email",
    placeholder: "Cannot edit",
    disabled: true,
    value: "user@example.com",
  },
};

// With leading icon
export const WithLeadingIcon = {
  args: {
    label: "Search",
    placeholder: "Search...",
    leading: <SearchIcon />,
  },
};

// With trailing icon
export const WithTrailingIcon = {
  args: {
    label: "Information",
    placeholder: "Enter information",
    trailing: <InfoIcon />,
  },
};

// With both icons
export const WithBothIcons = {
  args: {
    label: "Search with Info",
    placeholder: "Search...",
    leading: <SearchIcon />,
    trailing: <InfoIcon />,
  },
};

// Full example
export const FullExample = {
  args: {
    label: "Email Address",
    description: "We will never share your email.",
    placeholder: "you@example.com",
    helperText: "Enter your work email.",
    leading: <span>@</span>,
  },
};

// Error with icon
export const ErrorWithIcon = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: "This email is already taken",
    leading: <span>@</span>,
    defaultValue: "taken@example.com",
  },
};

// All states showcase
export const AllStates = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Input label="Default" placeholder="Placeholder text" />

      <Input
        label="With Description"
        description="This is a description"
        placeholder="Placeholder text"
      />

      <Input
        label="With Helper Text"
        helperText="This is helpful text"
        placeholder="Placeholder text"
      />

      <Input
        label="Error State"
        error="This field has an error"
        placeholder="Error placeholder"
        defaultValue="Invalid input"
      />

      <Input
        label="Disabled"
        disabled
        placeholder="Cannot type here"
        value="Disabled value"
      />

      <Input
        label="With Leading Icon"
        leading={<SearchIcon />}
        placeholder="Search..."
      />

      <Input
        label="With Trailing Icon"
        trailing={<InfoIcon />}
        placeholder="Enter info"
      />

      <Input
        label="With Both Icons"
        leading={<SearchIcon />}
        trailing={<InfoIcon />}
        placeholder="Search with info..."
      />
    </div>
  ),
};
