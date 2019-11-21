import React, { Component, lazy, Suspense } from "react";
import { Button } from "@progress/kendo-react-buttons";
import "@progress/kendo-theme-material/dist/all.css";
import "./App.css";

const StockChartContainer = lazy(() => import("./StockChartContainer"));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChart: false
    };
  }

  render() {
    const { showChart } = this.state;
    const buttonText = showChart ? "Hide Stock Chart" : "Show Stock Chart";
    const chartComponent = showChart ? <StockChartContainer /> : null;
    const loadingComponent = <div>Loading...</div>;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stock Chart</h1>
          <div className="App-button">
            <Button primary={true} onClick={this.handleClick}>
              {buttonText}
            </Button>
          </div>
        </header>
        <div className="App-chart">
          <Suspense fallback={loadingComponent}>{chartComponent}</Suspense>
        </div>
      </div>
    );
  }

  handleClick = () => {
    this.setState(prevState => ({
      showChart: !prevState.showChart
    }));
  };
}

export default App;
