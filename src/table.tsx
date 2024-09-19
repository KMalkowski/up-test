import { useRef, useState } from "react";

export default function Table() {
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [tooltipOffsetLeft, setTooltipOffsetLeft] = useState(0);
  const [tooltipOffsetTop, setTooltipOffsetTop] = useState(0);

  const headers = [
    "Header 1",
    "Header 2",
    "Header 3",
    "Header 4",
    "Header 5",
    "Header 6",
  ];
  const rows = [
    ["Cell 1-1", "Cell 1-2", "Cell 1-3", "Cell 1-4", "Cell 1-5", "Cell 1-6"],
    ["Cell 2-1", "Cell 2-2", "Cell 2-3", "Cell 2-4", "Cell 2-5", "Cell 2-6"],
    ["Cell 3-1", "Cell 3-2", "Cell 3-3", "Cell 3-4", "Cell 3-5", "Cell 3-6"],
    ["Cell 4-1", "Cell 4-2", "Cell 4-3", "Cell 4-4", "Cell 4-5", "Cell 4-6"],
    ["Cell 5-1", "Cell 5-2", "Cell 5-3", "Cell 5-4", "Cell 5-5", "Cell 5-6"],
    ["Cell 6-1", "Cell 6-2", "Cell 6-3", "Cell 6-4", "Cell 6-5", "Cell 6-6"],
    ["Cell 7-1", "Cell 7-2", "Cell 7-3", "Cell 7-4", "Cell 7-5", "Cell 7-6"],
    ["Cell 8-1", "Cell 8-2", "Cell 8-3", "Cell 8-4", "Cell 8-5", "Cell 8-6"],
  ];

  function handleHeaderScroll() {
    if (tableRef.current && headerRef.current) {
      tableRef.current.scrollLeft = headerRef.current.scrollLeft;
    }
  }

  function handleBodyScroll() {
    if (tableRef.current && headerRef.current) {
      headerRef.current.scrollLeft = tableRef.current.scrollLeft;
    }
  }

  return (
    <div className="flex flex-col w-[400px] h-[300px] border border-gray-300 rounded-md overflow-hidden">
      <div
        className={`flex overflow-y-hidden overflow-x-auto pr-[15px] pb-[15px] border-b border-gray-300 no-scrollbar`}
        ref={headerRef}
        onScroll={handleHeaderScroll}
      >
        {headers.map((header, index) => (
          <div
            key={header}
            className="flex-none w-[150px] h-[50px] p-2 border-b border-r border-gray-300 flex items-center justify-center group hover:cursor-pointer"
            onMouseEnter={(e) => {
              setTooltipOffsetTop(e.currentTarget.offsetTop + 35);
              setTooltipOffsetLeft(
                e.currentTarget.offsetLeft -
                  (headerRef.current?.scrollLeft ?? 0)
              );
            }}
          >
            {header}
            <div
              style={{
                left: tooltipOffsetLeft + "px",
                top: tooltipOffsetTop + "px",
              }}
              className={`toolkit hidden group-hover:block p-4 absolute bg-white text-black border-b border-gray-300`}
            >
              Header {index} tooltip!
            </div>
          </div>
        ))}
      </div>

      <div
        ref={tableRef}
        className="flex-grow overflow-y-scroll overflow-x-scroll"
        onScroll={handleBodyScroll}
      >
        <div className="inline-block min-w-full">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className="flex-none w-[150px] h-[50px] p-2 border-b border-r border-gray-300 flex items-center justify-center"
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
