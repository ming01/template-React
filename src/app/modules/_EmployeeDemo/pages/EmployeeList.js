import React from 'react'
import EmployeeTable from '../components/EmployeeTable'


function EmployeeList(props) {

    return (
        <div>
            <EmployeeTable history={props.history}></EmployeeTable>
        </div>
    )
}

export default EmployeeList
