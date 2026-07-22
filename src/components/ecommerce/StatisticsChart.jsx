import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import flatpickr from "flatpickr";
import ChartTab from "../common/ChartTab";
import { CalenderIcon } from "../../icons";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart({ data = [] }) {
  const datePickerRef = useRef(null);

  // =========================
  // DATE PICKER
  // =========================
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

  // =========================
  // CHART OPTIONS
  // =========================
  const options = {
    chart: {
      type: "bar",
      height: 310,
      toolbar: {
        show: false,
      },
      fontFamily: "Outfit, sans-serif",
      parentHeightOffset: 0,
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
        trim: true,
        hideOverlappingLabels: true,

        formatter: (value) => {
          if (!value) return "";

          return value.length > 12 ? `${value.substring(0, 12)}...` : value;
        },
      },
    },

    yaxis: {
      labels: {
        formatter: (val) => {
          if (val >= 100000) {
            return `₹${(val / 100000).toFixed(1)}L`;
          }

          if (val >= 1000) {
            return `₹${(val / 1000).toFixed(1)}K`;
          }

          return `₹${Number(val).toLocaleString("en-IN")}`;
        },
      },
    },

    grid: {
      borderColor: "#E5E7EB",
      padding: {
        left: 0,
        right: 0,
      },
    },

    tooltip: {
      y: {
        formatter: (val) => `₹ ${Number(val).toLocaleString("en-IN")}`,
      },
    },

    // =========================
    // RESPONSIVE
    // =========================
    responsive: [
      {
        // TABLET
        breakpoint: 1024,

        options: {
          chart: {
            height: 280,
          },

          plotOptions: {
            bar: {
              columnWidth: "50%",
            },
          },

          xaxis: {
            labels: {
              style: {
                fontSize: "11px",
              },
            },
          },

          yaxis: {
            labels: {
              style: {
                fontSize: "11px",
              },
            },
          },
        },
      },

      {
        // MOBILE
        breakpoint: 640,

        options: {
          chart: {
            height: 250,
          },

          plotOptions: {
            bar: {
              columnWidth: "60%",
            },
          },

          xaxis: {
            labels: {
              rotate: -45,

              style: {
                fontSize: "9px",
              },

              formatter: (value) => {
                if (!value) return "";

                return value.length > 8 ? `${value.substring(0, 8)}...` : value;
              },
            },
          },

          yaxis: {
            labels: {
              style: {
                fontSize: "9px",
              },
            },
          },
        },
      },
    ],
  };

  // =========================
  // CHART SERIES
  // =========================
  const series = [
    {
      name: "Amount",

      data: data.map((item) => item.value),
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* TITLE */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Category Wise Transactions
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Category wise amount summary
          </p>
        </div>

        {/* =========================
            CONTROLS
        ========================= */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* MONTHLY / YEARLY TAB */}
          <div className="w-full sm:w-auto">
            <ChartTab />
          </div>

          {/* DATE PICKER */}
          <div className="relative w-full sm:w-auto">
            <CalenderIcon className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-500" />

            <input
              ref={datePickerRef}
              type="text"
              placeholder="Select date"
              className="h-10 w-full min-w-[180px] rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* =========================
          CHART
      ========================= */}
      <div className="mt-6 w-full overflow-hidden">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={310}
          width="100%"
        />
      </div>
    </div>
  );
}
