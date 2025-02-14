import { Button, Flex, Segmented } from "antd"
import { useState } from "react"
import DailyTab from "./component/Daily";
import MonthlyTab from "./component/Monthly";
import YearlyTab from "./component/Yearly";
import { ArrowLeftOutlined } from "@ant-design/icons";

const DetailReport = ({ setShowDetail }: { setShowDetail: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [typeTab, setTypeTab] = useState<String>('daily');

    return (
        <>
            <Flex vertical gap={20}>
                <Flex>
                    <Button
                        type="link"
                        onClick={() => setShowDetail(false)}
                    >
                        <ArrowLeftOutlined/> Back
                    </Button>
                </Flex>
                <Flex>
                    <Segmented<String>
                        options={[
                            { label: 'Daily', value: 'daily' },
                            { label: 'Monthly', value: 'monthly' },
                            { label: 'Yearly', value: 'yearly' },
                        ]}
                        onChange={(value) => setTypeTab(value)}
                    />
                </Flex>

                <Flex vertical gap={20}>
                    {typeTab === 'daily' && <DailyTab />}

                    {typeTab === 'monthly' && <MonthlyTab />}

                    {typeTab === 'yearly' && <YearlyTab />}
                </Flex>
            </Flex>
        </>
    )
}

export default DetailReport;