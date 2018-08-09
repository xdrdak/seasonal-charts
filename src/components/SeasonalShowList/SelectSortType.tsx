import * as React from 'react';
import styled from 'styled-components';
import { Label } from 'rebass';
import BaseSelect from '../BaseSelect';

const Select = styled(BaseSelect)`
  width: 100%;
`;

export enum SortType {
  Airing = 'airing',
  Alphabetical = 'alphabetical',
}

interface Props {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: SortType;
}
export const SelectSortType: React.SFC<Props> = ({ onChange, value }) => (
  <>
    <Label htmlFor="filterBy">Sort By:&nbsp;</Label>
    <Select id="sortType" name="sortType" onChange={onChange} value={value}>
      <option value={SortType.Alphabetical}>Alphabetical</option>
      <option value={SortType.Airing}>Airing Date</option>
    </Select>
  </>
);
