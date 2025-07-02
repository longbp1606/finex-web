import { getChurnRate } from "@/services/chartAPI";
import { DatePicker, Flex } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

export default function ChurnRateChart() {
    const [currentYear, setCurrentYear] = useState(dayjs());
    const [data, setData] = useState<number[]>([]);
    const [avg, setAvg] = useState(0);

    useEffect(() => {
        const fetchChurnRate = async () => {
            const response = await getChurnRate({ year: currentYear.toDate() });
            const data: number[] = response.data.data;
            setData(data);
            setAvg(data.reduce((prev, cur) => prev + cur) / data.length);
        }

        fetchChurnRate();
    }, [currentYear]);

    return (
        <Flex vertical gap={12}>
            <DatePicker
                picker="year"
                className="max-w-[320px]"
                onChange={(v) => setCurrentYear(v)}
                value={currentYear} />

            <Chart
                type="line"
                data={{
                    datasets: [
                        {
                            label: "% Users Cancel",
                            data: data,
                            borderColor: "lightBlue",
                            backgroundColor: "lightBlue"
                        },
                        {
                            label: "Average",
                            data: Array.from({ length: 12 }, () => avg),
                            borderColor: "red",
                            backgroundColor: "red"
                        }
                    ],
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
                }}
            />
        </Flex>
    );
}