import React, { useState } from "react";
import { CategoryItem, Container, DetailButton, Header, Section, StyledSection, StyledTable, StyledText, VerticalSection } from "./Report.styled";
import { moneyData, weekOptions, weekSeries, reportColumns, reportData } from "./data";
import { Progress, Select } from "antd";
import Chart from "react-apexcharts";
import DetailReport from "./DetailReport";

const months = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}/2025`,
    value: `${i + 1}/2025`,
}));

const MoneyCard: React.FC = () => {
    return (
        <div>
            {moneyData.map((data, index) => (
                <Section key={index}>
                    <h1>{data.amount}</h1>
                    <p>{data.label}</p>
                </Section>
            ))}
        </div>
    );
};
const WeekChart: React.FC = () => (
    <Section title="Last week's spending">
        <Chart options={weekOptions} series={weekSeries} type="line" height={200} />
    </Section>
);

const ReportTable = ({ setShowDetail }: { setShowDetail: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [selectedMonth, setSelectedMonth] = useState(months[0].value);

    return (
        <StyledSection>
            <Header>
                <Select value={selectedMonth} onChange={setSelectedMonth} options={months} />
                <DetailButton onClick={() => setShowDetail(true)}>Detail &gt;</DetailButton>
            </Header>
            <StyledTable columns={reportColumns} dataSource={reportData} pagination={false} />
        </StyledSection>
    );
};
const TargetCategory: React.FC = () => (
    <Section title="Spending by Category">
        <CategoryItem>
            <StyledText>Food & Drinks</StyledText>
            <Progress percent={82} strokeColor="#3B82F6" />
        </CategoryItem>
        <CategoryItem>
            <StyledText>Shopping</StyledText>
            <Progress percent={67} strokeColor="#3B82F6" />
        </CategoryItem>
        <CategoryItem>
            <StyledText>Entertainment</StyledText>
            <Progress percent={90} strokeColor="#3B82F6" />
        </CategoryItem>
    </Section>
);

const Report: React.FC = () => {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            {showDetail ? (
                <DetailReport setShowDetail={setShowDetail}/>
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
