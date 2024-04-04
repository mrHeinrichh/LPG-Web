'use client'
import {
  Datatable,
  SelectField,
  Sidenav,
  Card,
  SentimentCard,
} from "@/components";
import { useDeliveriesStore } from "@/states";
import React, { useState, useEffect, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TABLE_HEADERS } from "./data";
import axios from "axios";
import Chart from "chart.js/auto";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Define an interface for transaction data
interface Transaction {
  _id: string;
  applicationResponsiveness: string;
  orderAcceptance: string;
  riderPerformance: string;
  overallSatisfaction: string;
  recommendation: string;
  updatedAt: Date;
}

export default function Deliveries() {
  const {
    page,
    limit,
    setLimit,
    nextPage,
    previousPage,
    feedbacks,
  } = useDeliveriesStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://lpg-api-06n8.onrender.com/api/v1/transactions/');
        setTransactions(response.data.data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);
  const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);

const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setStartDate(new Date(event.target.value));
};

  useEffect(() => {
    if (transactions.length > 0) {
      createBarGraph(transactions);
      createBarGraph2(transactions);
      createBarGraph3(transactions);
      createBarGraph4(transactions);
      createBarGraph5(transactions);


    }
  }, [transactions, startDate, endDate]);

  const createBarGraph = (transactions: Transaction[]) => {
    const sentiments = transactions.map(transaction => transaction.applicationResponsiveness);
    const positiveCount = sentiments.filter(sentiment => sentiment === 'Very satisfied' || sentiment === 'Satisfied').length;
    const negativeCount = sentiments.filter(sentiment => sentiment === 'Dissatisfied' || sentiment === 'Very dissatisfied').length;
    const neutralCount = sentiments.filter(sentiment => sentiment === 'Neutral').length;
    const canvas = document.createElement('canvas');
    canvas.width = 50; // Adjust width as needed
    canvas.height = 50; // Adjust height as needed
    canvas.style.marginRight = '10px'; // Add margin between canvases

    const ctx = document.getElementById('applicationResponsiveness') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [{
          label: 'applicationResponsiveness',
          data: [positiveCount, negativeCount, neutralCount],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  const createBarGraph2 = (transactions: Transaction[]) => {
    const sentiments = transactions.map(transaction => transaction.orderAcceptance);
    const positiveCount = sentiments.filter(sentiment => sentiment === 'Very satisfied' || sentiment === 'Satisfied').length;
    const negativeCount = sentiments.filter(sentiment => sentiment === 'Dissatisfied' || sentiment === 'Very dissatisfied').length;
    const neutralCount = sentiments.filter(sentiment => sentiment === 'Neutral').length;
    const canvas = document.createElement('canvas');
    canvas.width = 50; // Adjust width as needed
    canvas.height = 50; // Adjust height as needed
    canvas.style.marginRight = '10px'; // Add margin between canvases

    const ctx = document.getElementById('orderAcceptance') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [{
          label: 'orderAcceptance',
          data: [positiveCount, negativeCount, neutralCount],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  const createBarGraph3 = (transactions: Transaction[]) => {
    const sentiments = transactions.map(transaction => transaction.riderPerformance);
    const positiveCount = sentiments.filter(sentiment => sentiment === 'Very satisfied' || sentiment === 'Satisfied').length;
    const negativeCount = sentiments.filter(sentiment => sentiment === 'Dissatisfied' || sentiment === 'Very dissatisfied').length;
    const neutralCount = sentiments.filter(sentiment => sentiment === 'Neutral').length;
    const canvas = document.createElement('canvas');
    canvas.width = 50; // Adjust width as needed
    canvas.height = 50; // Adjust height as needed
    canvas.style.marginRight = '10px'; // Add margin between canvases

    const ctx = document.getElementById('riderPerformance') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [{
          label: 'riderPerformance',
          data: [positiveCount, negativeCount, neutralCount],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  const createBarGraph4 = (transactions: Transaction[]) => {
    const sentiments = transactions.map(transaction => transaction.overallSatisfaction);
    const positiveCount = sentiments.filter(sentiment => sentiment === 'Very satisfied' || sentiment === 'Satisfied').length;
    const negativeCount = sentiments.filter(sentiment => sentiment === 'Dissatisfied' || sentiment === 'Very dissatisfied').length;
    const neutralCount = sentiments.filter(sentiment => sentiment === 'Neutral').length;
    const canvas = document.createElement('canvas');
    canvas.width = 10; // Adjust width as needed
    canvas.height = 10; // Adjust height as needed
    canvas.style.marginRight = '10px'; // Add margin between canvases

    const ctx = document.getElementById('overallSatisfaction') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [{
          label: 'overallSatisfaction',
          data: [positiveCount, negativeCount, neutralCount],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  const createBarGraph5 = (transactions: Transaction[]) => {
    const sentiments = transactions.map(transaction => transaction.recommendation);
    const positiveCount = sentiments.filter(sentiment => sentiment === 'Very satisfied' || sentiment === 'Satisfied').length;
    const negativeCount = sentiments.filter(sentiment => sentiment === 'Dissatisfied' || sentiment === 'Very dissatisfied').length;
    const neutralCount = sentiments.filter(sentiment => sentiment === 'Neutral').length;
    const canvas = document.createElement('canvas');
    canvas.width = 50; // Adjust width as needed
    canvas.height = 50; // Adjust height as needed
    canvas.style.marginRight = '10px'; // Add margin between canvases
    const container = document.createElement('div');
    container.classList.add('flex');

    const ctx = document.getElementById('recommendation') as HTMLCanvasElement;
    container.appendChild(canvas);
    const card = document.getElementById('chartsCard') as HTMLDivElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [{
          label: 'recommendation',
          data: [positiveCount, negativeCount, neutralCount],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  const downloadFeedbackData = () => {
    const feedbackArrayData = transactions.map((transaction: Transaction) => {
      // Constructing a CSV row for each transaction
      const rowData = [
        transaction.applicationResponsiveness,
        transaction.orderAcceptance,
        transaction.riderPerformance,
        transaction.overallSatisfaction,
        transaction.recommendation,
        transaction.updatedAt.toString() // Assuming updatedAt is a Date object
      ];
      return rowData.join(','); // Joining the fields with commas
    });
  
    // Constructing the CSV string
    const csvString = 'applicationResponsiveness,orderAcceptance,riderPerformance,overallSatisfaction,recommendation,updatedAt\n' + feedbackArrayData.join('\n');
  
    // Creating a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });
  
    // Creating a URL for the Blob
    const url = window.URL.createObjectURL(blob);
  
    // Creating a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feedback_data.csv';
  
    // Triggering the download
    document.body.appendChild(a);
    a.click();
  
    // Cleanup
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setEndDate(new Date(event.target.value));
};
const downloadChartAsPdf = async (canvasId: string) => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const pdf = new jsPDF();
  const ratio = 2; // Adjust ratio for better resolution if needed
  const width = canvas.width / ratio;
  const height = canvas.height / ratio;
  const imageData = await html2canvas(canvas, { scale: ratio }).then(canvas =>
    canvas.toDataURL('image/png')
  );
  pdf.addImage(imageData, 'PNG', 0, 0, width, height);
  pdf.save(`${canvasId}.pdf`);
  };
  
  const filteredTransactions = useMemo(() => {
    if (!startDate || !endDate) return transactions;
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.updatedAt);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }, [transactions, startDate, endDate]);
  
  
  
  
  
  
  return (
    <>
      <Sidenav>

      <p className="text-2xl font-bold">Delivery Feedbacks</p>
        <div className="flex justify-between items-center w-full mt-5 mb-2 bg-white-100 rounded-md px-4 py-2">
          <div className=""></div>
          <div className="flex justify-end mt-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={downloadFeedbackData}>
              Download Datatable Data
            </button>
          </div>
        </div>
        <Card>
        <div>
  <label>Start Date:</label>
  <input type="date" onChange={handleStartDateChange} />
</div>
<div>
  <label>End Date:</label>
  <input type="date" onChange={handleEndDateChange} />
</div>

          <p className="text-2xl font-bold">Feedbacks</p>
          <div className="w-full flex justify-between py-2 px-3 bg-white-50">
            <div className="flex items-center gap-4 ">
              <SelectField
                options={[
                  { title: '100', value: 100 },
                  { title: '20', value: 20 },
                  { title: '10', value: 10 },
                  { title: '5', value: 5 },
                  { title: '1', value: 1 },
                ]}
                name={''}
                title={''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setLimit(Number(e.target.value));
                }}
              />
            </div>
            <div className="flex items-center gap-4 ">
              <FaChevronLeft
                onClick={() => {
                  previousPage();
                }}
              />
              {page}
              <FaChevronRight
                onClick={() => {
                  nextPage();
                }}
              />
            </div>
          </div>
          <Datatable header={TABLE_HEADERS}>
          {filteredTransactions.map((transaction: any) => (
  <tr key={transaction._id}>
    <td>{transaction.applicationResponsiveness}</td>
    <td>{transaction.orderAcceptance}</td>
    <td>{transaction.riderPerformance}</td>
    <td>{transaction.overallSatisfaction}</td>
    <td>{transaction.recommendation}</td>
    <td>{transaction.updatedAt.toString()}</td>
  </tr>
))}

          </Datatable>
        </Card>
        <div className="flex justify-center mt-4 space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => downloadChartAsPdf('applicationResponsiveness')}
        >
          Download applicationResponsiveness Chart
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => downloadChartAsPdf('orderAcceptance')}
        >
          Download orderAcceptance Chart
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => downloadChartAsPdf('riderPerformance')}
        >
          Download riderPerformance Chart
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => downloadChartAsPdf('overallSatisfaction')}
        >
          Download overallSatisfaction Chart
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => downloadChartAsPdf('recommendation')}
        >
          Download recommendation Chart
        </button>
      </div>
      </Sidenav>
      <SentimentCard id="chartsCard" className="flex flex-row space-x-4 overflow-x-auto">
        <canvas id="applicationResponsiveness"></canvas>
      
      </SentimentCard>
      
      <canvas id="orderAcceptance"></canvas>
        <canvas id="riderPerformance"></canvas>
        <canvas id="overallSatisfaction"></canvas>
        <canvas id="recommendation"></canvas>
    </>
  );
}