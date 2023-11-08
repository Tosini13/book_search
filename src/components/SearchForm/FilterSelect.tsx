import React from "react";
import styled from "@emotion/styled";

const SelectStyled = styled.select`
  background-color: ${(props) => props.theme.color.secondary} !important;
  color: #0a0b1a;
  padding: 0.5rem;
  border: none;
  font-size: 1rem;
  display: block;
  transition: border-color 150ms;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const SelectContainerStyled = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
  color: #0a0b1a;
  padding: 0.5rem 0.8rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type FilterSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: { [key: string]: string };
};

const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <SelectContainerStyled>
      <SelectStyled
        data-testid="select_form"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </SelectStyled>
    </SelectContainerStyled>
  );
};

export default FilterSelect;
