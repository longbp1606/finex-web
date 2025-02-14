import React, { useState } from "react";
import { Amount, CategoryItem, Container, DetailButton, Header, Label, Section, StyledTable, StyledText, VerticalSection } from "./Report.styled";
import { moneyData, weekSeries, reportColumns, reportData } from "./data";
import { Progress, Select } from "antd";
import Chart from "react-apexcharts";
import DetailReport from "./DetailReport";
import { theme } from "@/themes";

const months = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}/2025`,
    value: `${i + 1}/2025`,
}));

const MoneyCard: React.FC = () => {
    return (
        <div>
            {moneyData.map((data, index) => (
                <Section key={index}>
                    <Amount>{data.amount}</Amount>
                    <Label>{data.label}</Label>
                </Section>
            ))}
        </div>
    );
};

const weekOptions = {
    chart: {
        toolbar: {
            show: true, 
            tools: {
                pan: false, 
                reset: false,
                zoomin: true, 
                zoomout: true, 
                zoom: false, 
                download: true, 
            },
        },
    },
};

const WeekChart: React.FC = () => (
    <Section title="Last week's spending">
        <Chart options={weekOptions} series={weekSeries} type="line" height={250} />
    </Section>
);

const ReportTable = ({ setShowDetail }: { setShowDetail: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [selectedMonth, setSelectedMonth] = useState(months[0].value);

    return (
        <Section title="Trading history">
            <Header>
                <Select value={selectedMonth} onChange={setSelectedMonth} options={months} />
                <DetailButton onClick={() => setShowDetail(true)}>Detail &gt;</DetailButton>
            </Header>
            <StyledTable columns={reportColumns} dataSource={reportData} pagination={false} />
        </Section>
    );
};

const colors = ["#2A776A", `${theme.color.secondary}`, "#B0D1A2", `${theme.color.tertiary}`];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const TargetCategory: React.FC = () => (
    <Section title="Spending by Category">
        <CategoryItem>
            <StyledText>Food & Drinks</StyledText>
            <Progress percent={82} strokeColor={getRandomColor()} />
        </CategoryItem>
        <CategoryItem>
            <StyledText>Shopping</StyledText>
            <Progress percent={67} strokeColor={getRandomColor()} />
        </CategoryItem>
        <CategoryItem>
            <StyledText>Entertainment</StyledText>
            <Progress percent={90} strokeColor={getRandomColor()} />
        </CategoryItem>
    </Section>
);

const Report: React.FC = () => {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            {showDetail ? (
                <DetailReport setShowDetail={setShowDetail} />
            ) : (
                <Container>
                    <VerticalSection>
                        <MoneyCard />
                        <WeekChart />
                    </VerticalSection>
                    <ReportTable setShowDetail={setShowDetail} />
                    <TargetCategory />
                </Container>
            )}
        </>
    )
};

export default Report;
