import { Empty, Flex, Segmented, Select } from "antd"
import { useEffect, useState } from "react"
import DailyTab from "./component/Daily";
import MonthlyTab from "./component/Monthly";
import YearlyTab from "./component/Yearly";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { get } from "@/services/apiCaller";
import { setBoard } from "@/store/slices/analysis.slice";

const Analysis = () => {
    const [typeTab, setTypeTab] = useState<String>('daily');
    const boardId = useSelector((state: RootState) => state.analysis.boardId);
    const dispatch = useDispatch();
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBoards = async () => {
        setLoading(true);

        try {
            const response = await get('/api/board');

            if (!response || response.status !== 200) throw response.data;
            else {
                setBoards(response.data.data);
            }
        } catch (error: any) {
            console.error(error);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchBoards();
    }, [])

    return (
        <>
            <Flex vertical gap={20}>
                <Flex>
                    <Select
                        placeholder="Select board"
                        onChange={(value) => dispatch(setBoard(value))}
                        loading={loading}
                        options={boards.map((board: any) => ({ label: board.title, value: board.id }))}
                        value={boardId}
                        style={{ width: 200 }}
                    />
                </Flex>

                {boardId ? (
                    <>
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
                    </>
                ) : (
                    <Flex justify="center" align="center" style={{ height: '50vh' }}>
                        <Empty description="Please select budget board first" />
                    </Flex>
                )}
            </Flex>
        </>
    )
}

export default Analysis;