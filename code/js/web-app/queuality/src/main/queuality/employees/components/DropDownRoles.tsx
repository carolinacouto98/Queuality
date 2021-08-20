import { useEffect, useState } from "react"
import { Dropdown } from "semantic-ui-react"
import { Employee } from "../../../common/model/EmployeeModel"

type DropDownRolesProps = {
    roles: string[],
    employee: Employee,
    handleUpdateEmployee: (employee: Employee) => void
}
type Option = {
    key: string,
    text: string,
    value: string
}
export default function DropDownRoles(props : DropDownRolesProps) {
    const [options, setOptions] = useState<Option[]>()
    const employee = props.employee

    useEffect(() => setOptions(
        props
            .roles
            .map(role => { return { key: role, text: role, value: role } })
    ), [props.roles])

    const [currentValues, setCurrentValues] = useState<string[]>(employee.roles)

    // useEffect(() => { 
    //     employee.roles = currentValues
    //     props.handleUpdateEmployee(employee)
    // }, [currentValues, employee, props])

    return (
        <Dropdown
            options={options}
            placeholder='Choose Roles for Employee'
            multiple
            value={currentValues}
            onChange={(_, {value}) => {
                setCurrentValues(value as string[])
                employee.roles = currentValues
                props.handleUpdateEmployee(employee)
            }}
        />
    )
}