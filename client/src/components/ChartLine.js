import React, { memo, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { Chart } from "chart.js/auto";
import {
  getDaysInMonth,
  getMonthInYear,
  getDaysInRange,
  getMonthsInRange,
} from "../ultils/fn";
import dayjs from '../ultils/dayjs-config';


const ChartLine = ({ data, isMonth, customTime }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    // const number = isMonth
    //     ? getMonthsInRange(customTime?.from, customTime?.to)
    //     : getDaysInRange(customTime?.from, customTime?.to)
    const daysInMonth = getDaysInMonth(Date.now(), 20);
    const monthsInYear = getMonthInYear(Date.now(), 20);
    const rawData = isMonth ? monthsInYear : daysInMonth;
    // console.log('data', data);
    // console.log('raw', rawData);
    // dayjs("09-06-2025", "DD-MM-YYYY").format("DD-MM-YY")
    // console.log('day',dayjs("14-06-2025", 'DD-MM-YYYY').format('DD-MM-YY'))

    const editedData = rawData.map((el) => {
      // console.log('el', el)
      return {
        counter: data?.some(
          (i) => dayjs(i._id, "DD-MM-YYYY").format("DD-MM-YY") === el
        )
          ? data.find(
            (i) => dayjs(i._id, "DD-MM-YYYY").format("DD-MM-YY") === el
          )?.counter
          : 0,
        createdAt: el,
      };
    });
    setChartData(editedData);
    // console.log('edited',editedData);
  }, [data]);
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: true },
        grid: { color: "rgba(0,0,0,0.1)", drawTicks: false },
        min:
          Math.min(...chartData?.map((el) => +el.counter)) - 5 < 0
            ? 0
            : Math.min(...chartData?.map((el) => +el.counter)) - 5,
        max: Math.max(...chartData?.map((el) => +el.counter)) + 5,
        border: { dash: [20, 0] },
      },
      x: {
        ticks: { color: "black" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };
  return (
    <div className="py-4 w-full h-full">
      {chartData ? (
        <Line
          options={options}
          data={{
            labels: chartData?.map((el) => el.createdAt),
            datasets: [
              {
                data: chartData?.map((el) => +el.counter),
                borderColor: "#e35050",
                tension: 0.2,
                borderWidth: 2,
                pointBackgroundColor: "white",
                pointHoverRadius: 4,
                pointBorderColor: "#e35050",
                pointHoverBorderWidth: 4,
              },
            ],
          }}
        />
      ) : (
        <span>Không có đơn hàng nào.</span>
      )}
    </div>
  );
};

export default memo(ChartLine);