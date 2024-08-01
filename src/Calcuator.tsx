import React, { useState } from "react";
import styled from "styled-components";

export const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);

  const handleDigit = (digit: string) => {
    setDisplayValue((prev) => (prev === "0" ? digit : prev + digit));
  };

  const handleOperator = (nextOperator: string) => {
    setPreviousValue(displayValue);
    setDisplayValue("0");
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (operator && previousValue) {
      const current = parseFloat(displayValue);
      const previous = parseFloat(previousValue);

      let newValue;
      switch (operator) {
        case "+":
          newValue = previous + current;
          break;
        case "-":
          newValue = previous - current;
          break;
        case "*":
          newValue = previous * current;
          break;
        case "/":
          newValue = previous / current;
          break;
        default:
          return;
      }

      setDisplayValue(String(newValue));
      setOperator(null);
      setPreviousValue(null);
    }
  };

  const handleClear = () => {
    setDisplayValue("0");
    setOperator(null);
    setPreviousValue(null);
  };

  const handleClearEntry = () => {
    setDisplayValue("0");
  };

  const handlePercentage = () => {
    setDisplayValue((prev) => String(parseFloat(prev) / 100));
  };

  const buttonConfigs = [
    { label: "CE", onClick: handleClearEntry, special: true },
    { label: "C", onClick: handleClear },
    { label: "%", onClick: handlePercentage },
    { label: "÷", onClick: () => handleOperator("/"), special: true },
    { label: "7", onClick: () => handleDigit("7") },
    { label: "8", onClick: () => handleDigit("8") },
    { label: "9", onClick: () => handleDigit("9") },
    { label: "×", onClick: () => handleOperator("*"), special: true },
    { label: "4", onClick: () => handleDigit("4") },
    { label: "5", onClick: () => handleDigit("5") },
    { label: "6", onClick: () => handleDigit("6") },
    { label: "−", onClick: () => handleOperator("-"), special: true },
    { label: "1", onClick: () => handleDigit("1") },
    { label: "2", onClick: () => handleDigit("2") },
    { label: "3", onClick: () => handleDigit("3") },
    { label: "+", onClick: () => handleOperator("+"), special: true },
    { label: "±", onClick: () => handleDigit("±") },
    { label: "0", onClick: () => handleDigit("0") },
    { label: ",", onClick: () => handleDigit(",") },
    { label: "=", onClick: handleEquals, special: true, secondary: true },
  ];

  return (
    <CalculatorContainer>
      <Display>
        <EqualSign>=</EqualSign>
        {displayValue}
      </Display>
      <ButtonContainer>
        {buttonConfigs.map((config) => (
          <ButtonSpecial
            key={config.label}
            onClick={config.onClick}
            $variant={config.secondary ? "secondary" : undefined}
            special={config.special}
          >
            {config.label}
          </ButtonSpecial>
        ))}
      </ButtonContainer>
    </CalculatorContainer>
  );
};

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  margin: 100px auto;
  padding: 40px 24px;
  border-radius: 32px;
  background: #2c2c2c;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const Display = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 20px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 2.5em;
  border-radius: 20px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  color: #ebebeb;
`;

const EqualSign = styled.span`
  color: #6b6b6b;
`;

const Button = styled.button`
  height: 60px;
  width: 60px;
  background: #3c3c3c;
  border: none;
  border-radius: 50%;
  font-size: 1.5em;
  color: #fff;
  transition: background 0.3s, transform 0.1s, box-shadow 0.1s;
  box-shadow: 0 4px 6px rgba(95, 73, 73, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(255, 255, 255, 0.1),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #5c5c5c;
    cursor: pointer;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1),
      inset 0 1px 2px rgba(255, 255, 255, 0.2),
      inset 0 -1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const ButtonSpecial = styled(Button)<{
  $variant?: "primary" | "secondary";
  special?: boolean;
}>`
  background: ${(props) =>
    props.$variant === "secondary"
      ? "#7F45E2"
      : props.special
      ? "#462878"
      : "#3c3c3c"};

  &:hover {
    background: ${(props) =>
      props.$variant === "secondary"
        ? "#682cd1"
        : props.special
        ? "#3e216d"
        : "#5c5c5c"};
  }
`;
