import React, { useId } from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

/**
 * Input component for the design system.
 * Supports: Default, Focused, Disabled, Error states.
 * Accessories: Leading/Trailing icons.
 * Helper text and Error message.
 */
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
    const generatedId = useId();
    const id = externalId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const descriptionId = `${id}-description`;

    const hasError = !!error;
    const errorMessage =
      typeof error === "string" || React.isValidElement(error) ? error : null;

    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}

        {description && (
          <div id={descriptionId} className={styles.description}>
            {description}
          </div>
        )}

        <div
          className={`${styles.inputContainer} ${disabled ? styles.disabled : ""}`}
          data-error={hasError}
        >
          {leading && <span className={styles.leading}>{leading}</span>}

          <input
            ref={ref}
            id={id}
            className={styles.input}
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

          {trailing && <span className={styles.trailing}>{trailing}</span>}
        </div>

        {hasError && errorMessage ? (
          <div id={errorId} className={styles.helperText} data-error="true">
            {errorMessage}
          </div>
        ) : helperText ? (
          <div id={helperId} className={styles.helperText}>
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
