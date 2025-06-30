import { DatePicker, Flex } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

export default function WauChart() {
    const [currentWeek, setCurrentWeek] = useState(dayjs());
    const [data, setData] = useState<number[]>([]);
    const [avg, setAvg] = useState(0);

    useEffect(() => {
        const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
        setData(data);
        setAvg(data.reduce((prev, cur) => prev+cur) / data.length);
    }, [currentWeek]);

    return (
        <Flex vertical gap={12}>
            <DatePicker 
                picker="week" 
                className="max-w-[320px]"
                onChange={(v) => setCurrentWeek(v)}
                value={currentWeek} />

            <Chart
                type="line"
                data={{
                    datasets: [
                        {
                            label: "Online users",
                            data: data,
                            borderColor: "lightBlue",
                            backgroundColor: "lightBlue"
                        },
                        {
                            label: "Average",
                            data: Array.from({ length: 7 }, () => avg),
                            borderColor: "red",
                            backgroundColor: "red"
                        }
                    ],
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                }}
            />
        </Flex>
    );
}