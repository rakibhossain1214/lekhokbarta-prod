import React from 'react'
import { Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import SelectDropdown from '@/components/material-ui-components/SelectDropdown'
// import RichEditor from '@/components/RichEditor'
import dynamic from 'next/dynamic'
const RichEditor = dynamic(() => import('@/components/RichEditor'), {
  ssr: false,
})

function Write() {
  return (
    <div>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <form className="w-full" noValidate autoComplete="off">
          <TextField className="w-full" id="standard-basic" label="Write you blog title..." />
          <SelectDropdown name="Category" />
          <RichEditor />
        </form>
      </Grid>
    </div>
  )
}

export default Write
