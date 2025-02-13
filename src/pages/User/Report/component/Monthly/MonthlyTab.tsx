import { Col, DatePicker, DatePickerProps, Flex } from "antd";
import Chart from "react-apexcharts";

const MonthlyTab = () => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <>
            <Flex>
                <DatePicker onChange={onChange} picker="month" />
            </Flex>

            <Col span={24} lg={14}>
                <Flex vertical>
                    <Chart
                        type="bar"
                        options={{
                            dataLabels: {
                                enabled: false,
                            },
                            plotOptions: {
                                bar: {
                                    horizontal: false,
                                    borderRadius: 4,
                                },
                            },
                            chart: {
                                toolbar: {
                                    show: false,
                                },
                            },
                        }}
                        series={[
                            {
                                name: "Daily Spent",
                                data: Array.from({ length: 30 }, () =>
                                    Math.floor(1 + Math.random() * 100)
                                ),
                            },
                        ]}
                    />
                </Flex>
            </Col>
        </>
    )
}

export default MonthlyTab