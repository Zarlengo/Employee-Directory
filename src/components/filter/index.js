import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Filter({ setFilterMode, filterMode, toggleModal, setFilterString, filterString }){

    const filterClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setFilterMode(event.currentTarget.getAttribute('data-id'));
    }

    return (
        <ul>
            <li data-id="filterStart" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>starts with</b>&nbsp;
                { filterMode === 'filterStart' ? 
                <input
                    type="text"
                    value={ filterString }
                    onChange={(event) => { setFilterString(event.target.value) }}
                    onKeyDown={(event) => { if (event.key === 'Enter') {toggleModal()}}}
                /> : <div /> }
            </li>
            <li data-id="filterEnd" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>ends with</b>&nbsp;
                { filterMode === 'filterEnd' ? 
                <input
                    type="text"
                    value={ filterString }
                    onChange={(event) => { setFilterString(event.target.value) }}
                    onKeyDown={(event) => { if (event.key === 'Enter') {toggleModal()}}}
                /> : <div /> }
            </li>
            <li data-id="filterContain" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>contains</b>&nbsp;
                { filterMode === 'filterContain' ? 
                <input
                    type="text"
                    value={ filterString }
                    onChange={(event) => { setFilterString(event.target.value) }}
                    onKeyDown={(event) => { if (event.key === 'Enter') {toggleModal()}}}
                /> : <div /> }
            </li>
            <li data-id="filter!Contain" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>does not contain</b>&nbsp;
                { filterMode === 'filter!Contain' ? 
                <input
                    type="text"
                    value={ filterString }
                    onChange={(event) => { setFilterString(event.target.value) }}
                    onKeyDown={(event) => { if (event.key === 'Enter') {toggleModal()}}}
                /> : <div /> }
            </li>
            <li data-id="filter=" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>equals</b>&nbsp;
                { filterMode === 'filter=' ? 
                <input
                    type="text"
                    value={ filterString }
                    onChange={(event) => { setFilterString(event.target.value) }}
                    onKeyDown={(event) => { if (event.key === 'Enter') {toggleModal()}}}
                /> : <div /> }
            </li>
            <li data-id="filter!=" onClick={(event) => filterClick(event)}>
                <FontAwesomeIcon icon={ faFilter } />&nbsp;
                filter: <b>does not equal</b>&nbsp;
                { filterMode === 'filter!=' ? 
                <input
                    type="text"
                    value={ filterString }
                    onChange={(event) => { setFilterString(event.target.value) }}
                    onKeyDown={(event) => { if (event.key === 'Enter') {toggleModal()}}}
                /> : <div /> }
            </li>
        </ul>
    );
}
