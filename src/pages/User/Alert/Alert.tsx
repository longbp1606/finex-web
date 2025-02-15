/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight } from "lucide-react";
import "./index.css";

const Alert = () => {
    // const [modalContent, setModalContent] = useState(null);
    // const [showModal, setShowModal] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [form] = Form.useForm();

    // const handleCardClick = (content: any) => {
    //     setModalContent(content);
    //     setShowModal(true);
    // };

    // const closeModal = () => {
    //     setShowModal(false);
    // };

    // const currentBalance = 2670000;
    // const totalExpenses = 3330000;
    // const totalIncome = 6000000;
    // const daysLeftInMonth = 10; // Giả sử còn 10 ngày trong tháng
    // const avgDailyExpense = totalExpenses / (30 - daysLeftInMonth);
    // const remainingAllowance = avgDailyExpense * daysLeftInMonth;
    // const isBalanceHealthy = currentBalance > remainingAllowance;


    return (
        <div className="alert_area">
            <div className="alert_item">
    <h3 className="alert_title">Negative Financial Alerts</h3>
    <div className="negativeInfor">
        <div className="currentBalance">
            <div className="balance">
                <span>Current Balance</span>
                <p className="currentAmount">2,670,000 VND</p>
                {/* <div className={`status_indicator ${isBalanceHealthy ? 'healthy' : 'warning'}`}></div> */}
            </div>
            <div className="total">
                <div className="totalCard">
                    <span>Total Income</span>
                    <span>6,000,000 VND</span>
                </div>
                <div className="totalCard">
                    <span>Total Expenses</span>
                    <span>3,330,000 VND</span>
                </div>
            </div>
        </div>
        <div className="negativeInforDetail">
            <div className="alert_card">
                <span className="alert_card-title">Unusual Expenses</span>
                <p>You have just spent <b>5,000,000 VND</b> on a large transaction!</p>
                <ChevronRight className="arrow_icon" />
            </div>
            <div className="alert_card">
                <span className="alert_card-title">Upcoming Debt Payments</span>
                <p>The closest upcoming debt payment is <b>2,000,000 VND </b>, due in 5 days.</p>
                <ChevronRight className="arrow_icon" />
            </div>
            <div className="alert_card">
                <span className="alert_card-title">Expense Reduction Suggestion</span> 
                <p>Consider reducing dining out expenses to save <b> 300,000 VND </b> per month </p>
                <ChevronRight className="arrow_icon" />
            </div>
        </div>
    </div>
</div>
<div className="alert_item">
    <h3 className="alert_title">Financial Goal Alerts</h3>
    <div className="negativeInforDetail">
        <div className="alert_card" 
        // onClick={() => handleCardClick("Details about savings fund status.")}
        > 
            <span className="alert_card-title">Insufficient Savings Fund</span>
            <p>Your savings fund is not sufficient.</p>
            <ChevronRight className="arrow_icon" />
        </div>
        <div className="alert_card">
            <span className="alert_card-title">Budget Plan Off Track</span>
            <p>You have exceeded the dining category budget by 20% this month.</p>
            <ChevronRight className="arrow_icon" />
        </div>
        <div className="alert_card">
            <span className="alert_card-title">Saving for a Major Goal</span>
            <p>You need an additional 15,000,000 VND to afford your target motorbike.</p>
            <ChevronRight className="arrow_icon" />
        </div>
    </div>
</div>
<div className="alert_item">
    <h3 className="alert_title">Financial Improvement Suggestions</h3>
    <div className="negativeInforDetail">
        <div className="alert_card">
            <span className="alert_card-title">Automated Expense Reduction</span>
            <p>You can save 500,000 VND/month by cutting back on coffee and snacks.</p>
            <ChevronRight className="arrow_icon" />
        </div>
        <div className="alert_card">
            <span className="alert_card-title">Increase Income Suggestions</span>
            <p>Consider freelancing, selling unused items, or investing to increase your income.</p>
            <ChevronRight className="arrow_icon" />
        </div>
        <div className="alert_card">
            <span className="alert_card-title">Create a New Budget</span>
            <p>Plan your budget for next month to better manage your finances!</p>
            <ChevronRight className="arrow_icon" />
        </div>
    </div>
</div>

            {/* {showModal && 
            // <Modal content={modalContent} onClose={closeModal} />
            <Modal title="Add new" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
                <Form form={form} >
                    
                </Form>
            </Modal>
            } */}
        </div>
    )
}

export default Alert