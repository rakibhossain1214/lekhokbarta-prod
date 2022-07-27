import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { ColourOption, colourOptions } from '../data/multiSelectOptions.tsx'
import { ActionMeta, OnChangeValue } from 'react-select'

function CustomMultiSelect(props) {
  const handleChange = (newValue) => {
    console.group('Value Changed :D')
    console.log(newValue)
  }

  return (
    <div>
      <CreatableSelect isMulti onChange={handleChange} options={colourOptions} />
    </div>
  )
}

export default CustomMultiSelect
