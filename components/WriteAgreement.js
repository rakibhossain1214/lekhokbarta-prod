import { useRouter } from 'next/router'
import React, { useState } from 'react'

function WriteAgreement() {
  const [showModal, setShowModal] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const router = useRouter()
  return (
    <>
      {showModal ? (
        <div>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-6 h-full w-auto max-w-4xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-gray-800">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold dark:text-slate-300">
                    Blog/Content Agreement
                  </h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    // onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  {/* <p className="my-4 text-lg leading-relaxed text-slate-500 dark:text-slate-300"></p> */}
                  <h3 className="mb-3 border-b-2 border-teal-500">
                    বিষয়বস্তু নির্ধারণের নির্দেশিকা
                  </h3>

                  <h4 className="mt-2">লেখার বিষয়সমূহ</h4>
                  <p className="mt-1">
                    আপনি ইতিহাস, ক্রীড়া, বিজ্ঞান ও প্রযুক্তি, আকর্ষণীয় স্থানীয় এবং আন্তর্জাতিক
                    ঘটনা, জীবনধারা, পপ সংস্কৃতি, ভ্রমণ, বিশেষজ্ঞ মতামত এবং আরও অনেক কিছু সম্পর্কে
                    আমাদের প্ল্যাটফর্মে লিখতে পারেন।
                  </p>

                  <h4 className="mt-2">আমাদের প্রত্যাশা</h4>
                  <p className="mt-1">
                    আপনার নিবন্ধের একটি কাহিনীসূত্র থাকতে হবে, নিবন্ধটি এভাবে সাজাতে হবে যাতে মনে হয়
                    আপনি আপনার সামনে বসে থাকা পাঠকদের কাহিনীটি (বিষয়বস্তু যা-ই হোক না কেন)
                    শোনাচ্ছেন।
                  </p>

                  <h4 className="mt-2">পারস্পরিক শ্রদ্ধাবোধ</h4>
                  <p className="mt-1">
                    আপনার নিবন্ধের মাধ্যমে কোনো ধর্ম, বর্ণ, জাতি বা লিঙ্গের মানুষকে ছোট করা যাবে না।
                  </p>
                  <p className="mt-1">
                    রোর মিডিয়ার প্ল্যাটফর্মে সব ধরনের অত্যুক্তি বা উস্কানিমূলক বক্তব্য কঠোরভাবে
                    নিষিদ্ধ।
                  </p>

                  <h4 className="mt-2">মতাদর্শ প্রচার</h4>
                  <p className="mt-1">
                    কোনো রাজনৈতিক, ধর্মীয় বা কোনো ব্যক্তিগত মতামত প্রচার করা কঠোরভাবে নিষিদ্ধ।
                  </p>

                  <h4 className="mt-2">তথ্যসূত্র</h4>
                  <p className="mt-1">
                    তথ্যের উৎসের ব্যাপারে সতর্ক থাকতে হবে। অনির্ভরযোগ্য উৎস থেকে প্রাপ্ত তথ্য
                    ব্যবহার করার অনুমতি দেয়া হবে না। ব্যবহার করা সব তথ্য বিশ্বাসযোগ্য হতে হবে। যদি-
                  </p>
                  <p className="mt-1">
                    - কোনো ওয়েবসাইট থেকে তথ্য নেয়া হয় তাহলে নিবন্ধের শেষে পুরো URL লিখে দিতে হবে
                    (বুকমার্ক ১, ২, ৩... এভাবে) অথবা সুবিধামতো হাইপারলিংক করে দিতে হবে।
                  </p>
                  <p className="mt-1">
                    - কোনো বই থেকে তথ্য নেয়া হলে প্রয়োজনীয় জায়গায় বুকমার্ক দিতে হবে। নিবন্ধের শেষে
                    নিচে বর্ণিত বিন্যাসে বইটি উদ্ধৃত করতে হবে– বইয়ের নাম - লেখক এর নাম - পৃষ্ঠা
                    নম্বর - সংস্করণ নম্বর - প্রকাশক - প্রকাশনার তারিখ
                  </p>
                  <p className="mt-1">- উইকিপিডিয়াকে তথ্যের উৎস হিসেবে ব্যবহার করা যাবে না।</p>

                  <h4 className="mt-2">চৌর্যবৃত্তিকে 'না' বলুন</h4>
                  <p className="mt-1">কোনো ধরনের কপি-পেস্ট গ্রহণযোগ্য হবে না।</p>

                  <h4 className="mt-2">ছবি সংক্রান্ত নির্দেশনা</h4>
                  <p className="mt-1">
                    নিবন্ধের সাথে সম্পর্কিত ৪-৫টি ছবি অবশ্যই যুক্ত করতে হবে। ছবিগুলোতে কোনো ধরনের
                    জলছাপ থাকা চলবে না। কোনো প্রকারের নগ্ন বা অশ্লীল ছবি বা ভিডিও কোনোভাবেই
                    গ্রহণযোগ্য হবে না। সম্ভব হলে অবশ্যই চিত্রগ্রাহকের নাম উল্লেখ করতে হবে। সম্ভব না
                    হলে অবশ্যই যে ওয়েবসাইট থেকে ছবি নেয়া হয়েছে তার নাম উল্লেখ করতে হবে।
                  </p>

                  <h4 className="mt-2">শব্দসংখ্যা</h4>
                  <p className="mt-1">
                    নিবন্ধটি কমপক্ষে ৭৫০ শব্দের মধ্যে থাকতে হবে। কোনো সর্বোচ্চ শব্দ সীমা নেই।
                  </p>

                  <h4 className="mt-2">ছবির আকার (লেখার ভেতরে)</h4>
                  <p className="mt-1">
                    আর্টিকেলের ভেতরে ব্যবহার করা ছবির প্রস্থ কমপক্ষে ১,০০০ পিক্সেল হতে হবে।
                  </p>

                  <h4 className="mt-2">ফিচার ইমেজের আকার</h4>
                  <p className="mt-1">ফিচার ইমেজের প্রস্থ কমপক্ষে ১,২০০ পিক্সেল হতে হবে।</p>

                  <h4 className="mt-2">সম্মানী</h4>
                  <p className="mt-1">
                    প্রকাশিত সকল লেখার জন্য সম্মানী নির্ধারণ করবে রোর বাংলা সম্পাদনা পর্ষদ। লেখার
                    গুণগত মান, লেখকের নিয়মিত কাজ ও পাঠকপ্রিয়তা বিবেচনা করে সম্মানী নির্ধারিত হবে এবং
                    সম্পাদনা পর্ষদ লেখকের সাথে যোগাযোগ করে এই বিষয়ে জানিয়ে দেবেন। কেবলমাত্র সম্পাদনা
                    পর্ষদের অনুমোদন পেলেই কোনো লেখার জন্য সম্মানী দেওয়া হবে, অন্যথায় নয়।
                  </p>

                  <h3 className="mt-5 mb-3 border-b-2 border-teal-500">জমা</h3>

                  <h4 className="mt-2">লেখা জমা দিতে করণীয়</h4>
                  <p className="mt-1">
                    আপনার নিবন্ধ এবং প্রাসঙ্গিক চিত্র জমা দিতে নিচের ফর্মটি ব্যবহার করুন।
                  </p>

                  <h4 className="mt-2">লেখা জমা দেবার পর করণীয়</h4>
                  <p className="mt-1">
                    সফলভাবে জমা দেয়ার পরে আমাদের সম্পাদক প্যানেল আপনার লেখাটি পর্যালোচনা করবে। আমরা
                    ইমেইলের মাধ্যমে নিবন্ধটির অবস্থা আপনাকে অবহিত করবো। আপনি আপনার প্রোফাইল থেকেও এর
                    অবস্থা যাচাই করতে পারবেন।
                  </p>

                  <h4 className="mt-2">সম্পাদনা প্রক্রিয়া</h4>
                  <p className="mt-1">
                    আপনার নিবন্ধটি গৃহীত হলে আমরা একটি গুগল ডকুমেন্টে প্রয়োজনীয় সম্পাদনা করব এবং
                    সম্পাদনায় সহযোগিতা করার জন্য আপনাকে আমন্ত্রণ জানাব।
                  </p>

                  <h4 className="mt-2">লেখার সর্বশেষ অবস্থা</h4>
                  <p className="mt-1">
                    নিবন্ধটি প্রকাশ করা হলে কন্ট্রিবিউটর ড্যাশবোর্ডের মাধ্যমে আপনাকে জানানো হবে।
                  </p>

                  <h4 className="mt-2">সম্পাদনার সময়সীমা</h4>
                  <p className="mt-1">পুরো ব্যাপারে সম্পাদনা করতে ১৪ কর্মদিবস লাগতে পারে।</p>

                  <h4 className="mt-2">জিজ্ঞাসা</h4>
                  <p className="mt-1">
                    আপনার আর কোনো জিজ্ঞাসা থাকলে আমাদেরকে amrakibulhossain@gmail.com ঠিকানায় ইমেইল
                    করতে পারেন।
                  </p>

                  <div className="mt-5 flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      I Agree with all the terms and conditions.
                    </label>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b p-6">
                  <button
                    className="mr-1 mb-1 bg-red-500 px-6 py-2 text-sm font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => router.replace('/')}
                  >
                    No, cancel
                  </button>
                  {isChecked ? (
                    <button
                      className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Yes, I agree
                    </button>
                  ) : (
                    <button
                      className="mr-1 mb-1 rounded bg-gray-400 px-6 py-2 text-sm font-bold uppercase text-gray-100 shadow outline-none transition-all duration-150 ease-linear"
                      type="button"
                      disabled={true}
                      onClick={() => setShowModal(false)}
                    >
                      Yes, I agree
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
      ) : null}
    </>
  )
}

export default WriteAgreement
