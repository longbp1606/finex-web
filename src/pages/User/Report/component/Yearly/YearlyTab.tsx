import { Col, DatePicker, DatePickerProps, Flex } from "antd";
import Chart from "react-apexcharts";

const YearlyTab = () => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <>
            <Flex>
                <DatePicker onChange={onChange} picker="year" />
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
                                name: "Monthly Spent",
                                data: Array.from({ length: 12 }, () =>
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

export default YearlyTab