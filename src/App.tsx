import * as React from 'react';
import { injectGlobal } from 'styled-components';
import { Container, Flex } from 'rebass';
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

class App extends React.Component {
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

  render() {
    return (
      <Container mb={3} maxWidth={['1024px', '1440px']}>
        <Flex justifyContent="center" my={4}>
          <TextLogo />
        </Flex>

        <SeasonalShowList
          season={Season.Summer}
          seasonYear={2018}
          format={Format.tv}
        />
      </Container>
    );
  }
}

export default App;
