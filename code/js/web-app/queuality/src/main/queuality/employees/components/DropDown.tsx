import { useEffect, useState } from "react"
import { Dropdown } from "semantic-ui-react"
import { Employee } from "../../../common/model/EmployeeModel"

type DropDownProps = {
    property: string,
    values: string[],
    employee: Employee,
    onChange: (values: string[]) => void,
    //handleUpdateEmployee: (employee: Employee) => void
    fluid?: boolean
}
type Option = {
    key: string,
    text: string,
    value: string
}

export default function DropDown(props : DropDownProps) {
    const [options, setOptions] = useState<Option[]>()
    const employee = props.employee

    useEffect(() => setOptions(
        props
            .values
            ?.map(value => { return { key: value, text: value, value: value } })
    ), [props.values])
    
    const [currentValues, setCurrentValues] 
        = useState<string[]>(Object.getOwnPropertyDescriptor(employee, props.property)!!.value)

    return (
        <Dropdown
            options={options}
            placeholder={`Choose ${props.property} for Employee`}
            multiple
            fluid={props.fluid}
            value={currentValues}
            onChange={(_, {value}) => {
                const values = value as string[]
                setCurrentValues(values)
                props.onChange(values)
            }}
        />
    )
}