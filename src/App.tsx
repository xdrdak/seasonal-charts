import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import DevTools from 'mobx-react-devtools';
import SeasonalShowList from './components/SeasonalShowList';

enum Season {
  Summer = 'SUMMER',
  Winter = 'WINTER',
  Spring = 'SPRING',
  Fall = 'FALL',
}

enum Format {
  tv = 'TV',
}

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

class App extends React.Component {
  componentDidMount() {
    injectGlobal`
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
    `;
  }

  render() {
    return (
      <Container>
        <h1>Seasonal Charts</h1>

        <SeasonalShowList
          season={Season.Summer}
          seasonYear={2018}
          format={Format.tv}
        />

        <DevTools />
      </Container>
    );
  }
}

export default App;
