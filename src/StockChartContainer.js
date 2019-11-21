import React from 'react';

import {
    StockChart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartNavigator,
    ChartNavigatorSelect,
    ChartNavigatorSeries,
    ChartNavigatorSeriesItem
} from '@progress/kendo-react-charts';
import { IntlService } from '@progress/kendo-react-intl';
import { filterBy } from '@progress/kendo-data-query';

import 'hammerjs';

import data from './stock-data.json';

const intl = new IntlService('en');
const stockData = data.map(item => (Object.assign({}, item, { Date: intl.parseDate(item.Date) })));

const from = new Date('2009/02/05');
const to = new Date('2011/10/07');

class StockChartContainer extends React.Component {
    state = {
        seriesData: Array.from(stockData),
        navigatorData: Array.from(stockData)
    };

    render() {
        const { seriesData, navigatorData } = this.state;
        return (
            <StockChart onNavigatorFilter={this.onNavigatorChange} partialRedraw={true}>
                <ChartTitle text="The Boeing Company NYSE:BA" />
                <ChartSeries>
                    <ChartSeriesItem
                        data={seriesData}
                        type="candlestick"
                        openField="Open"
                        closeField="Close"
                        lowField="Low"
                        highField="High"
                        categoryField="Date"
                    />
                </ChartSeries>
                <ChartNavigator>
                    <ChartNavigatorSelect from={from} to={to} />
                    <ChartNavigatorSeries>
                        <ChartNavigatorSeriesItem
                            data={navigatorData}
                            type="area"
                            field="Close"
                            categoryField="Date"
                        />
                    </ChartNavigatorSeries>
                </ChartNavigator>
            </StockChart>
        );
    }

    onNavigatorChange = (event) => {
        const filters = {
            logic: 'and',
            filters: [{
                field: 'Date',
                operator: 'gte',
                value: event.from
            }, {
                field: 'Date',
                operator: 'lt',
                value: event.to
            }]
        };

        this.setState((prevState) => ({
            seriesData: filterBy(prevState.navigatorData, filters)
        }));
    }
}

export default StockChartContainer;
