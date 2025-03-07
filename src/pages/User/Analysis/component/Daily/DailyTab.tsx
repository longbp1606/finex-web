import { ReportDataType } from "@/pages/User/Report/Report.table";
import { DatePicker, DatePickerProps, Flex, message, Table, Typography } from "antd"
import { ReportColumns } from "../../Analysis.table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { extractedRecord } from "@/services/analysisAPI";


const { Text } = Typography;

const DailyTab = () => {
    const boardId = useSelector((state: RootState) => state.analysis.boardId);
    const [messageApi, contextHolder] = message.useMessage();
    
    const renderExtractedRecord = async (dateString: string) => {
        try {
            const response = await extractedRecord({ boardId, date: dateString });

            if (!response || response.status !== 200) throw response.data;
            else messageApi.success(response.data.message);
        } catch (error: any) {
            messageApi.error(error.response.data.message);
        }
    }

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <>
            <Flex>
                <DatePicker onChange={onChange} />
            </Flex>

            <Table<ReportDataType>
                columns={ReportColumns}
                dataSource={[]}
                footer={() => (
                    <Flex vertical>
                        <Text>
                            <Text strong>Total spent:</Text> 0k{" "}
                            VND
                        </Text>
                    </Flex>
                )}
            />
        </>
    )
}

export default DailyTab