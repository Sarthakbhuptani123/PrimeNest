import { useState, useEffect } from "react";
import "./emiCalculator.scss";
import { motion } from "framer-motion";

function EMICalculator({ price }) {
    const [loanAmount, setLoanAmount] = useState(price || 1000000);
    const [downPayment, setDownPayment] = useState(price ? price * 0.2 : 200000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(20); // Years

    const [emi, setEmi] = useState(0);
    const [principal, setPrincipal] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    useEffect(() => {
        const p = loanAmount - downPayment;
        setPrincipal(p);

        const r = interestRate / 12 / 100;
        const n = tenure * 12;

        const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setEmi(Math.round(emiValue));

        const totalAmount = emiValue * n;
        setTotalInterest(Math.round(totalAmount - p));
    }, [loanAmount, downPayment, interestRate, tenure]);

    // Chart Data calculations
    const totalVal = principal + totalInterest;
    const principalPercent = (principal / totalVal) * 360;
    const interestPercent = (totalInterest / totalVal) * 360;

    return (
        <div className="emi-calculator section-box">
            <h3>Smart Mortgage Calculator</h3>

            <div className="calc-container">
                <div className="controls">
                    <div className="control-group">
                        <label>
                            <span>Total Price</span>
                            <span>₹ {loanAmount.toLocaleString()}</span>
                        </label>
                        <input
                            type="range"
                            min={price * 0.5}
                            max={price * 1.5}
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                        />
                    </div>

                    <div className="control-group">
                        <label>
                            <span>Down Payment ({Math.round((downPayment / loanAmount) * 100)}%)</span>
                            <span>₹ {downPayment.toLocaleString()}</span>
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={loanAmount * 0.9}
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                        />
                    </div>

                    <div className="control-group">
                        <label>
                            <span>Interest Rate</span>
                            <span>{interestRate} %</span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={15}
                            step={0.1}
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                        />
                    </div>

                    <div className="control-group">
                        <label>
                            <span>Loan Tenure</span>
                            <span>{tenure} Years</span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={30}
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="result-viz">
                    <div className="chart-wrapper">
                        {/* Conic Gradient Doughnut */}
                        <div
                            className="doughnut"
                            style={{
                                background: `conic-gradient(
                  var(--primary) 0deg ${principalPercent}deg, 
                  var(--text-soft) ${principalPercent}deg 360deg
                )`
                            }}
                        >
                            <div className="hole">
                                <div className="monthly-emi">
                                    <span>Monthly EMI</span>
                                    <strong>₹ {emi.toLocaleString()}</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="legend">
                        <div className="item">
                            <span className="dot p"></span>
                            <span>Principal</span>
                        </div>
                        <div className="item">
                            <span className="dot i"></span>
                            <span>Interest</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EMICalculator;
