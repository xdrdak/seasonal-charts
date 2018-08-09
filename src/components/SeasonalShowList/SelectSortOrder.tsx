import * as React from 'react';
import styled from 'styled-components';
import { Label } from 'rebass';
import BaseSelect from '../BaseSelect';

const Select = styled(BaseSelect)`
  width: 100%;
`;

export enum SortOrder {
  Ascending = 'ascending',
  Descending = 'descending',
}

interface Props {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: SortOrder;
}
export const SelectSortOrder: React.SFC<Props> = ({ onChange, value }) => (
  <>
    <Label htmlFor="sortOrdering">Order:&nbsp;</Label>
    <Select
      id="sortOrdering"
      name="sortOrdering"
      onChange={onChange}
      value={value}
    >
      <option value={SortOrder.Ascending}>Ascending</option>
      <option value={SortOrder.Descending}>Descending</option>
    </Select>
  </>
);
