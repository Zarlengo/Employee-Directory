import React from 'react';
import './style.css';

function TableRow({data}){
    return (
        <tr>
            <th>{ data.lastName }</th>
            <th>{ data.name }</th>
            <th>{ data.ext }</th>
            <th>{ data.title }</th>
            <th><a href={`mailto:${data.email}`}>{ data.email }</a></th>
            <th>{ data.department }</th>
            <th>{ data.manager} </th>
        </tr>
    );
}

export default TableRow;