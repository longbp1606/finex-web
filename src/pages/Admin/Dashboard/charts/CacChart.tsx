import { getCac } from "@/services/chartAPI";
import { DatePicker, Flex } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

export default function CacChart() {
    const [currentYear, setCurrentYear] = useState(dayjs());
    const [data, setData] = useState<number[]>([]);
    const [avg, setAvg] = useState(0);


    useEffect(() => {
        const fetchCac = async () => {
            const response = await getCac({ year: currentYear.toDate() });
            const data: number[] = response.data.data;
            setData(data);
            setAvg(data.reduce((prev, cur) => prev + cur) / data.length)
        }

        fetchCac();
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
                            label: "Customer Acquisition Cost",
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