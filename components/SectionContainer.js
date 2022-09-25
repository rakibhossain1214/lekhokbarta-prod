export default function SectionContainer({ children, showHeader }) {  
  return ( 
    showHeader === true ? 
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">{children}</div> 
    :  
    <div className="text-gray-500 dark:text-white-200">{children}</div>
  )
}
