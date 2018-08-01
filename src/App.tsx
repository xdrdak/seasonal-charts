import * as React from 'react';
import { injectGlobal } from 'styled-components';
import { Container, Flex, Group, Button } from 'rebass';
import SeasonalShowList from './components/SeasonalShowList';
import TextLogo from './components/TextLogo';

enum Season {
  Summer = 'SUMMER',
  Winter = 'WINTER',
  Spring = 'SPRING',
  Fall = 'FALL',
}

enum Format {
  tv = 'TV',
}

interface GroupButtonProps {
  onClick: Function;
  selected: boolean;
  children: any;
  restProps?: any;
}
const GroupButton: React.SFC<GroupButtonProps> = ({
  onClick,
  selected,
  children,
  ...restProps
}) => (
  <Button
    bg={selected ? 'light-blue' : 'blue'}
    onClick={onClick}
    {...restProps}
  >
    {children}
  </Button>
);

interface AppState {
  selectedSeason: Season;
  selectedYear: number;
}
class App extends React.Component<any, AppState> {
  currentYear: number = new Date().getUTCFullYear();
  state = {
    selectedSeason: Season.Summer,
    selectedYear: this.currentYear,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    injectGlobal`
      html, body {
        background-color: #f4eff7;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
    `;
  }

  isSelectedSeason(seasonName: Season) {
    const season = this.state.selectedSeason;
    return season === seasonName;
  }

  setSeason = (seasonName: Season) => {
    this.setState({ selectedSeason: seasonName });
  };

  setYear = (year: number) => {
    this.setState({ selectedYear: year });
  };

  isSeason = (season: Season) => {
    return this.state.selectedSeason === season;
  };

  isYear = (year: number) => {
    return this.state.selectedYear === year;
  };

  render() {
    return (
      <Container mb={3} maxWidth={['960px', '1024px', '1600px']}>
        <Flex justifyContent="center" my={4}>
          <TextLogo />
        </Flex>

        <Flex justifyContent="center" my={4}>
          {/* Move to another component */}
          <Group>
            <GroupButton
              selected={this.isYear(this.currentYear)}
              onClick={() => this.setYear(this.currentYear)}
            >
              {this.currentYear}
            </GroupButton>
            <GroupButton
              selected={this.isYear(this.currentYear + 1)}
              onClick={() => this.setYear(this.currentYear + 1)}
            >
              {this.currentYear + 1}
            </GroupButton>
          </Group>
        </Flex>

        <Flex justifyContent="center" my={4}>
          {/* Move to another component */}
          <Group>
            <GroupButton
              selected={this.isSeason(Season.Summer)}
              onClick={() => this.setSeason(Season.Summer)}
            >
              Summer
            </GroupButton>
            <GroupButton
              selected={this.isSeason(Season.Fall)}
              onClick={() => this.setSeason(Season.Fall)}
            >
              Fall
            </GroupButton>
            <GroupButton
              selected={this.isSeason(Season.Winter)}
              onClick={() => this.setSeason(Season.Winter)}
            >
              Winter
            </GroupButton>
            <GroupButton
              selected={this.isSeason(Season.Spring)}
              onClick={() => this.setSeason(Season.Spring)}
            >
              Spring
            </GroupButton>
          </Group>
        </Flex>

        <SeasonalShowList
          season={this.state.selectedSeason}
          seasonYear={this.state.selectedYear}
          format={Format.tv}
        />
      </Container>
    );
  }
}

export default App;
