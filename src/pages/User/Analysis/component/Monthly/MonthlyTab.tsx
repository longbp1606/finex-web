import { monthlyAnalysis, MonthlyAnalysisResponse } from "@/services/analysisAPI";
import { RootState } from "@/store";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Col, DatePicker, DatePickerProps, Flex, message, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const { Text } = Typography;

const MonthlyTab = () => {
    const boardId = useSelector((state: RootState) => state.analysis.boardId);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
    const [dataAnalysis, setDataAnalysis] = useState<MonthlyAnalysisResponse | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [totalSpent, setTotalSpent] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const fetchMonthlyAnalysis = async () => {
        setLoading(true);
        try {
            const response = await monthlyAnalysis({ boardId, date: selectedDate.format('YYYY-MM-DD') });

            if (!response || response.status !== 200) throw response.data;
            else {
                const convertData = response.data.data as MonthlyAnalysisResponse;
                setDataAnalysis(convertData);
                setTotalSpent(convertData.total);
            }
        }
        catch (error: any) {
            setTotalSpent(0);
            setDataAnalysis(null);
            if (error.response) {
                messageApi.error(error.response.data.message);
            } else {
                messageApi.error(error.code === 404 ? "This account haven't created" : error.message);
            }
            console.error(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchMonthlyAnalysis();
    }, [selectedDate, boardId]);

    const onChange: DatePickerProps['onChange'] = (date) => {
        setSelectedDate(date as dayjs.Dayjs);
    };

    return (
        <>
            {contextHolder}

            <Flex>
                <DatePicker onChange={onChange} picker="month" value={selectedDate} />
            </Flex>

            <Col span={24} lg={14}>
                {loading ? <Loading3QuartersOutlined spin /> : (
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
                                    data: dataAnalysis ? dataAnalysis.chart : [],
                                },
                            ]}
                        />
                        <Text>
                            <Text strong>Total spent:</Text> {totalSpent.toLocaleString()}{" "}VND
                        </Text>
                    </Flex>
                )}
            </Col>
        </>
    )
}

export default MonthlyTab