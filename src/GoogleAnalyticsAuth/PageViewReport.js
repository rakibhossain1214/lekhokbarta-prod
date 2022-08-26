import React, { useState, useEffect } from 'react'
import { addDays } from 'date-fns'
import { queryReport } from './queryReport'
import Link from 'next/link'

const PageviewsReport = (props) => {
  const [reportData, setReportData] = useState([])
  const [startDate, setStartDate] = useState(addDays(new Date(), -1000))
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

    const getReport = () => {
      try{
      queryReport(request)
        .then((resp) => displayResults(resp))
        .catch((error) => console.error(error))
      }catch(e){
        console.log(e)
        window.location.reload()
      }
    }
    getReport();
  }, [])


  let totalEarned = 0
  useEffect(()=>{
    reportData.map((row, id) => {
      props.authorPosts.map( post => {
        if(row.path === `/blog/${post.postId}/${post.frontMatter.slug}`){
          props.handleTotalEarning(totalEarned = totalEarned + (row.views * .02))
        }
      })
    })
  },[reportData])

  return (
    <div className="relative overflow-x-auto">
      {reportData.length > 0 && (
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 mt-4">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-2">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Blog
              </th>
              <th scope="col" className="py-3 px-6">
                Views
              </th>
              <th scope="col" className="py-3 px-6">
                CPM (bdt)
              </th>
              <th scope="col" className="py-3 px-6">
                Earning (bdt)
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
                      <td className="py-4 px-2">{id}</td>
                      <td className="py-4 px-6">
                        <Link href={`/blog/${post.postId}/${post.frontMatter.slug}`}>
                          <p className='text-teal-500'>{post.frontMatter.title}</p>
                        </Link>
                      </td>
                      <td className="py-4 px-6">{row.views}</td>
                      <td className="py-4 px-6">20</td>
                      <td className="py-4 px-6">{row.views * .02}</td>
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
