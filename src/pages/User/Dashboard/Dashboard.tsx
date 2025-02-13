import React from "react";
import { Progress } from "antd";
import Chart from "react-apexcharts";
import { MoneyCollectOutlined } from "@ant-design/icons";
import {
  DashboardContainer,
  Section,
  ChartContainer,
  CategoryContainer,
  TransactionContainer,
  Container,
  ChartSection,
  LegendContainer,
  LegendItem,
  LegendText,
  Divider,
  Cards,
  IconWrapper,
  Content,
  Title,
  Amount,
  ProgressBar,
  Footer,
  Percentage,
  New,
  StyledTable
} from "./Dashboard.styled";
import {
  outcome,
  income,
  savings,
  overviewData,
  categoryData,
  categoryBalanceData,
  transactions,
} from "./data";

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <Container>
        <Section negative={income.percentage < 0}>
          <div className="title">Income</div>
          <div className="balance-container">
            <div className="balance-value">${income.amount.toLocaleString()}</div>
            <div className="percentage-change">
              {income.percentage > 0 ? "▲" : "▼"} {income.percentage}%
            </div>
          </div>
          <div className="comparison">Compared to (${income.lastMonth.toLocaleString()} last month)</div>
        </Section>
        <Section negative={outcome.percentage < 0}>
          <div className="title">Outcome</div>
          <div className="balance-container">
            <div className="balance-value">${outcome.amount.toLocaleString()}</div>
            <div className="percentage-change">
              {outcome.percentage > 0 ? "▲" : "▼"} {outcome.percentage}%
            </div>
          </div>
          <div className="comparison">Compared to (${outcome.lastMonth.toLocaleString()} last month)</div>
        </Section>
        <Section negative={savings.percentage < 0}>
          <div className="title">Savings</div>
          <div className="balance-container">
            <div className="balance-value">${savings.amount.toLocaleString()}</div>
            <div className="percentage-change">
              {savings.percentage > 0 ? "▲" : "▼"} {savings.percentage}%
            </div>
          </div>
          <div className="comparison">Compared to (${savings.lastMonth.toLocaleString()} last month)</div>
        </Section>
      </Container>

      <Container>
        <ChartSection>
          <Section title="Overview">
            <Chart
              type="bar"
              options={{
                chart: { id: "overview-chart" },
                xaxis: { categories: overviewData.map((d) => d.month) },
                colors: ["#0A0E7A", "#36A2EB"],
                legend: {
                  position: "bottom",
                  markers: { size: 8 }
                },
                dataLabels: { enabled: false },
                tooltip: { shared: true, intersect: false },
                grid: { borderColor: "#e0e0e0", strokeDashArray: 5 },
              }}
              series={[
                { name: "Income", data: overviewData.map((d) => d.income) },
                { name: "Outcome", data: overviewData.map((d) => d.outcome) },
              ]}
            />
          </Section>

          <Section title="Category Distribution">
            <ChartContainer>
              <Chart
                type="donut"
                options={{
                  labels: categoryData.map((d) => d.label),
                  colors: ["#0A0E7A", "#36A2EB", "#1234A1", "#2551C4"],
                  legend: { show: false },
                  dataLabels: { enabled: false },
                }}
                series={categoryData.map((d) => d.value)}
              />
              <LegendContainer>
                {categoryData.map((item, index) => (
                  <React.Fragment key={index}>
                    <LegendItem style={{ textAlign: "center" }}>
                      <LegendText>
                        <div
                          style={{
                            color: ["#0A0E7A", "#36A2EB", "#1234A1", "#2551C4"][index],
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                        >
                          {item.value}%
                        </div>
                        <div style={{ color: "#A0A0A0", fontSize: "14px" }}>{item.label}</div>
                      </LegendText>
                    </LegendItem>

                    {index !== categoryData.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </LegendContainer>
            </ChartContainer>
          </Section>
        </ChartSection>
      </Container>
      <Container>
        <Section title="Your Category">
          <CategoryContainer>
            {categoryBalanceData.map((item, index) => (
              <Cards key={index}>
                <IconWrapper style={{
                  background: "#ECF4E9",
                  padding: "10px",
                  borderRadius: "10px"
                }}>
                  <MoneyCollectOutlined style={{ fontSize: "36px", color: '#18453E' }} />
                </IconWrapper>
                <Content>
                  <Title>{item.label}</Title>
                  <Amount>
                    <strong>${item.amount.toLocaleString()}</strong> / ${item.income.toLocaleString()}
                  </Amount>
                  <ProgressBar>
                    <Progress
                      percent={(item.amount / item.income) * 100}
                      strokeColor={index === 0 ? "#58a6ff" : "#001F5C"}
                      showInfo={false}
                    />
                  </ProgressBar>
                  <Footer>
                    <Percentage>{(item.amount / item.income) * 100}% of your goal</Percentage>
                    <New>+{item.percentage}%</New>
                  </Footer>
                </Content>
              </Cards>
            ))}
          </CategoryContainer>
        </Section>

        <Section title="Transactions">
          <TransactionContainer>
            <StyledTable
              dataSource={transactions}
              columns={[
                { title: "Name", dataIndex: "name", key: "name" },
                { title: "Time", dataIndex: "time", key: "time" },
                { title: "Amount", dataIndex: "amount", key: "amount" },
                { title: "Category", dataIndex: "category", key: "category" },
              ]}
              pagination={false}
            />
          </TransactionContainer>
        </Section>
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;
