import { useCallback, useEffect, useState } from "react"
import { Save } from "lucide-react";

export interface ToolStats {
  tool_view_count: number
  monthly_view_count: any
  clap_count: number
  deal_count: number
}

const ToolStatsModal = ({ initialToolStats, onHide, onSave }: { initialToolStats: ToolStats, onHide: any, onSave: any}) => {
  const [toolStats, setToolStats] = useState(initialToolStats)
  const isClapCountChanged = initialToolStats.clap_count !== toolStats.clap_count

  useEffect(() => {
    setToolStats(initialToolStats)
  }, [initialToolStats])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setToolStats((toolStats) => ({
      ...toolStats,
      [e.target.name]: Number(e.target.value)
    }))
  }, [setToolStats])

  // const handleSave = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault(),
  //   onSave(toolStats)
  // }, [toolStats, onSave])
  
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 z-50 justify-center items-center w-full flex"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border-2">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tool Stats
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onHide}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total Views
                </label>
                <input
                  type="number"
                  name="total_views"
                  value={toolStats.tool_view_count}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  disabled
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Monthly Total Views
                </label>
                <input
                  type="number"
                  name="monthly_total_views"
                  value={toolStats.monthly_view_count[0]}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  disabled
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total Claps
                </label>
                <input
                  type="number"
                  name="clap_count"
                  value={toolStats.clap_count}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total Deals
                </label>
                <input
                  type="number"
                  name="total_deals"
                  value={toolStats.deal_count}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  disabled
                />
              </div>
            </div>
            <button
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => {e.preventDefault(), onSave(toolStats)}}
              disabled={!isClapCountChanged}
            >
              <Save className='w-4 mr-2' />
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ToolStatsModal