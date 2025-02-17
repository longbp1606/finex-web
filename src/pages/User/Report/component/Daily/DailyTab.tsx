import { DatePicker, DatePickerProps, Flex, Table, Typography } from "antd"
import { ReportColumns, ReportDataType } from "../../Report.table";

const { Text } = Typography;

const DailyTab = () => {
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