import React, { useId, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../contexts/ThemeContext";


const Input = React.forwardRef(
  (
    {
      label,
      description,
      helperText,
      error,
      leading,
      trailing,
      disabled = false,
      className,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const { tokens } = useTheme();
    const generatedId = useId();
    const id = externalId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const descriptionId = `${id}-description`;

    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const hasError = !!error;
    const errorMessage =
      typeof error === "string" || React.isValidElement(error) ? error : null;

    const getBorderStyle = () => {
      if (hasError) {
        const errorBorder = tokens.borders.input.error;
        return `${errorBorder.width} ${errorBorder.style} ${errorBorder.color}`;
      }
      if (isFocused && !disabled) {
        const activeBorder = tokens.borders.input.active;
        return `${activeBorder.width} ${activeBorder.style} ${activeBorder.color}`;
      }
      if (isHovered && !disabled) {
        const hoverBorder = tokens.borders.input.hover;
        return `${hoverBorder.width} ${hoverBorder.style} ${hoverBorder.color}`;
      }
      const primaryBorder = tokens.borders.input.primary;
      return `${primaryBorder.width} ${primaryBorder.style} ${primaryBorder.color}`;
    };

    const wrapperStyles = {
      display: "flex",
      flexDirection: "column",
      gap: tokens.spacing.xs,
      width: "100%",
      fontFamily: tokens.fontFamilies.body,
    };

    const labelStyles = {
      display: "block",
      fontSize: tokens.fontSizes.s,
      lineHeight: tokens.lineHeights.s,
      fontWeight: tokens.fontWeight["500"],
      color: tokens.content.primary,
    };

    const descriptionStyles = {
      fontSize: tokens.fontSizes.s,
      lineHeight: tokens.lineHeights.s,
      color: tokens.content.secondary,
    };

    const inputContainerStyles = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%",
      border: getBorderStyle(),
      borderRadius: tokens.borderRadius.input,
      backgroundColor: disabled ? tokens.bg.disabled : tokens.bg.default,
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      padding: `0 ${tokens.spacing.s}`,
      height: tokens.sizing["4xl"],
      boxSizing: "border-box",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "text",
      // added custom box shadow for focus state to match with figma
      boxShadow:
        isFocused && !hasError && !disabled
          ? `0 0 0 ${tokens.spacing["3xs"]} ${tokens.border.active}66`
          : "none",
    };

    const inputStyles = {
      flex: 1,
      border: "none",
      background: "transparent",
      padding: `${tokens.spacing.s} 0`,
      fontFamily: tokens.fontFamilies.body,
      fontSize: tokens.fontSizes.s,
      lineHeight: tokens.lineHeights.s,
      color: disabled ? tokens.content.disabled : tokens.content.primary,
      outline: "none",
      minWidth: 0,
      cursor: disabled ? "not-allowed" : "text",
    };

    const accessoryStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: tokens.content.secondary,
    };

    const leadingStyles = {
      ...accessoryStyles,
      marginRight: tokens.spacing.xs,
    };

    const trailingStyles = {
      ...accessoryStyles,
      marginLeft: tokens.spacing.xs,
    };

    // Helper text styles
    const helperTextStyles = {
      fontSize: tokens.fontSizes.xs,
      lineHeight: tokens.lineHeights.xs,
      color: hasError ? tokens.border.negative : tokens.content.secondary,
    };

    return (
      <div
        style={{ ...wrapperStyles, ...(className ? {} : {}) }}
        className={className}
      >
        {label && (
          <label htmlFor={id} style={labelStyles}>
            {label}
          </label>
        )}

        {description && (
          <div id={descriptionId} style={descriptionStyles}>
            {description}
          </div>
        )}

        <div
          style={inputContainerStyles}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {leading && <span style={leadingStyles}>{leading}</span>}

          <input
            ref={ref}
            id={id}
            style={inputStyles}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              [
                description ? descriptionId : null,
                hasError ? errorId : null,
                !hasError && helperText ? helperId : null,
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
            {...props}
          />

          {trailing && <span style={trailingStyles}>{trailing}</span>}
        </div>

        {hasError && errorMessage ? (
          <div id={errorId} style={helperTextStyles}>
            {errorMessage}
          </div>
        ) : helperText ? (
          <div id={helperId} style={helperTextStyles}>
            {helperText}
          </div>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.node,
  description: PropTypes.node,
  helperText: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  leading: PropTypes.node,
  trailing: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Input;
