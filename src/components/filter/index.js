import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Filter({ filterClickHandler }){

    const filterClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        filterClickHandler(event.currentTarget.getAttribute('data-id'));
    }

    return (
        <ul>
            <li data-id="sortAsc" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faArrowUp } />&nbsp;
                sort ascending
            </li>
            <li data-id="sortDesc" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faArrowDown } />&nbsp;
                sort descending
            </li>
            <li data-id="filterStart" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>starts with</b>
            </li>
            <li data-id="filterEnd" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>ends with</b>
            </li>
            <li data-id="filterContain" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>contains</b>
            </li>
            <li data-id="filter!Contain" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>does not contain</b>
            </li>
            <li data-id="filter=" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>equals</b>
            </li>
            <li data-id="filter!=" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>does not equal</b>
            </li>
            <li data-id="filterList" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>in a list</b>
            </li>
        </ul>
    );
}
