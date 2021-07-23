import { openStdin } from 'process'
import React, { Component, useState } from 'react'
import { useEffect } from 'react'
import { Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react'

type AddDesksDropdownProps = {
    desks: string[]
    handleUpdatedDesks(desks: string[]): void
}

export default function AddDesksDropdown(props: AddDesksDropdownProps) {

    const [opts, setOpts] = useState(props.desks.map(desk => {
        return {key: desk, text: desk, value: desk}
    }))

    const [currentValues, setCurrentValues] = useState<string[]>(props.desks)

    const handleAddition = (_e: any, { value }: DropdownProps) => {
        const val = value as string
        setOpts([...opts, {key: val, text: val, value: val}])
        setCurrentValues([...currentValues, val])  
    }

    const handleChange = (_e: any, { value }: DropdownProps) => {
        setCurrentValues(value as string[])
    }    

    useEffect(() =>
        props.handleUpdatedDesks(currentValues)
    , [currentValues])


    return (
        <Dropdown
            style={{marginLeft:'1%'}}
            options={opts}
            placeholder='Add Desk'
            search
            selection
            fluid
            multiple
            allowAdditions
            value={currentValues}
            onAddItem={handleAddition}
            onChange={handleChange}
      />
    )
}