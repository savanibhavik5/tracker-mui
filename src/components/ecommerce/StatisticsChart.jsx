import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import flatpickr from "flatpickr";
import ChartTab from "../common/ChartTab";
import { CalenderIcon } from "../../icons";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart({ data  }) {
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (!datePickerRef.current) return;

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const fp = flatpickr(datePickerRef.current, {
      mode: "range",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M d",
      defaultDate: [sevenDaysAgo, today],
      clickOpens: true,
      prevArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      nextArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    });

    return () => {
      fp.destroy();
    };
  }, []);

  const options = {
    chart: {
      type: "bar",
      height: 310,
      toolbar: {
        show: false,
      },
      fontFamily: "Outfit, sans-serif",
    },

    colors: ["#465FFF"],

    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "45%",
      },
    },

    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },

    xaxis: {
      categories: data.map((item) => item.category),

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },

      labels: {
        rotate: -45,
      },
    },

    yaxis: {
      labels: {
        formatter: (val) => `₹${val}`,
      },
    },

    grid: {
      borderColor: "#E5E7EB",
    },

    tooltip: {
      y: {
        formatter: (val) => `₹ ${val.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: "Amount",
      data: data.map((item) => item.value),
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">

      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Category Wise Transactions
          </h3>

          {/* <p className="mt-1 text-gray-500 dark:text-gray-400">
            Category wise amount summary
          </p> */}
        </div>

        <div className="flex items-center gap-3">

          <ChartTab />

          <div className="relative">
            <input
              ref={datePickerRef}
              className="h-11 rounded-lg border border-gray-300 bg-transparent py-2 pl-4 pr-11 text-sm text-gray-700 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              placeholder="Select date"
            />

            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400">
              <CalenderIcon className="size-6" />
            </span>
          </div>

        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[700px] xl:min-w-full">

          <Chart
            options={options}
            series={series}
            type="bar"
            height={310}
          />

        </div>
      </div>

    </div>
  );
}