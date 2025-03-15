import { DatePicker, DatePickerProps, Flex, message, Table, Typography } from "antd"
import { AnalysisDataType, ReportColumns } from "../../Analysis.table";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AnalysisResponse, dailyAnalysis, DailyAnalysisResponse, extractedRecord } from "@/services/analysisAPI";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Text } = Typography;

const DailyTab = () => {
    const boardId = useSelector((state: RootState) => state.analysis.boardId);
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<AnalysisDataType[]>([]);
    const [totalSpent, setTotalSpent] = useState<number>(0);

    const renderExtractedRecord = async () => {
        setLoading(true);
        try {
            const response = await extractedRecord({ boardId, date: selectedDate.format('YYYY-MM-DD') });

            if (!response || response.status !== 200) {
                setDataSource([]);
                throw response.data
            } else {
                const convertData = response.data.data as AnalysisResponse[];
                const data = convertData.map((item, index) => ({ ...item, index: index + 1, key: item.id }));
                setDataSource(data);
            }
        } catch (error: any) {
            console.error(error);
        }
        setLoading(false);
    };

    const fetchDailyAnalysis = async () => {
        setLoading(true);
        try {
            const response = await dailyAnalysis({ boardId, date: selectedDate.format('YYYY-MM-DD') });

            if (response.status !== 200) {
                setTotalSpent(0);
                throw response.data;
            } else {
                const convertData = response.data.data as DailyAnalysisResponse;
                setTotalSpent(convertData.total);
            }
        }
        catch (error: any) {
            setTotalSpent(0);
            if (error.response) {
                messageApi.error(error.response.data.message);
            } else {
                messageApi.error(error.code === 404 ? "Analysis not found" : error.message);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        renderExtractedRecord();
        fetchDailyAnalysis();
    }, [selectedDate, boardId]);

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        setSelectedDate(date as dayjs.Dayjs);
    };

    return (
        <>
            {contextHolder}

            <Flex>
                <DatePicker onChange={onChange} value={selectedDate} />
            </Flex>

            <Table<AnalysisDataType>
                loading={loading}
                columns={ReportColumns}
                dataSource={dataSource ? dataSource : []}
                footer={() => (
                    <Flex vertical>
                        <Text>
                            <Text strong>Total spent:</Text> {totalSpent.toLocaleString()}{" "}
                            VND
                        </Text>
                    </Flex>
                )}
            />
        </>
    )
}

export default DailyTab