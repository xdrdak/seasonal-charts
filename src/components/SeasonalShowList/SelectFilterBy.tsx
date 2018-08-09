import * as React from 'react';
import styled from 'styled-components';
import { Label } from 'rebass';
import BaseSelect from '../BaseSelect';

const Select = styled(BaseSelect)`
  width: 100%;
`;

export enum FilterBy {
  Tracked = 'tracked',
  Untracked = 'untracked',
  None = 'none',
}

interface Props {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: FilterBy;
}
export const SelectFilterBy: React.SFC<Props> = ({ onChange, value }) => (
  <>
    <Label htmlFor="filterBy">Filter By:&nbsp;</Label>
    <Select id="filterBy" name="filterBy" onChange={onChange} value={value}>
      <option value={FilterBy.None}>All shows</option>
      <option value={FilterBy.Tracked}>Tracked Only</option>
      <option value={FilterBy.Untracked}>Untracked Only</option>
    </Select>
  </>
);
