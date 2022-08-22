import React, { useState, useEffect } from 'react'
import { addDays } from 'date-fns'
import { queryReport } from './queryReport'

const PageviewsReport = (props) => {
  const [reportData, setReportData] = useState([])
  const [startDate, setStartDate] = useState(addDays(new Date(), -10))
  const [endDate, setEndDate] = useState(new Date())
  const [totalPages, setTotalPages] = useState(0)

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows
    setTotalPages(queryResult.length)
    const total = response.result.reports[0].data.totals[0].values[0]
    let newReportData = []
    queryResult.forEach((row, idx) => {
      if (idx < 10) {
        let tempObj = {
          path: row.dimensions[0],
          views: row.metrics[0].values[0],
          perc: `${parseFloat((row.metrics[0].values[0] / total) * 100).toFixed(1)}%`,
        }
        newReportData.push(tempObj)
      }
    })
    setReportData(newReportData)
  }

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate,
      endDate,
      metrics: 'ga:pageviews',
      dimensions: ['ga:pagePath'],
      orderBy: {
        fieldName: 'ga:pageViews',
        order: 'DESCENDING',
      },
      filter: 'ga:pagePath!@localhost/',
    }
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => displayResults(resp))
          .catch((error) => console.error(error)),
      1000
    )
  }, [startDate, endDate])

  return (
    <div className="relative overflow-x-auto">
      {/* <p>{`Total pages - ${totalPages}`}</p> */}

      {reportData.length && (
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Page
              </th>
              <th scope="col" className="py-3 px-6">
                Views
              </th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, id) =>
              props.authorPosts.map(
                (post) =>
                  row.path === `/blog/${post.postId}/${post.frontMatter.slug}` && (
                    <tr
                      key={id}
                      className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <td className="py-4 px-6">{row.path}</td>
                      <td className="py-4 px-6">{row.views}</td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PageviewsReport
