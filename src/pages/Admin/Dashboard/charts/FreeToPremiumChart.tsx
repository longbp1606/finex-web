import { DatePicker, Flex } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

export default function FreeToPremiumChart() {
    const [currentYear, setCurrentYear] = useState(dayjs());
    const [data, setData] = useState<number[]>([]);
    const [avg, setAvg] = useState(0);

    useEffect(() => {
        const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
        setData(data);
        setAvg(data.reduce((prev, cur) => prev + cur) / data.length)
    }, [currentYear])

    return (
        <Flex vertical gap={12}>
            <DatePicker 
                picker="year" 
                className="max-w-[320px]"
                onChange={(v) => setCurrentYear(v)}
                value={currentYear} />
            
            <Chart
                type="scatter"
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            type: "bar",
                            label: "Conversion",
                            data: data,
                            borderColor: "lightBlue",
                            backgroundColor: "lightBlue",
                            order: 2
                        },
                        {
                            type: "line",
                            label: "Average",
                            data: Array.from({ length: 12 }, () => avg),
                            borderColor: "red",
                            backgroundColor: "red",
                            order: 1
                        }
                    ]
                }}
            />
        </Flex>
    )
}