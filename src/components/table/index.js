import React, { useState } from 'react';
import Modal from 'react-modal';
import './style.css';
import TableRow from '../tableRow';
import Filter from '../filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowsAltV, faFilter } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

function Table(data){
    const [ sortCol, setSortCol ] = useState('lastName');
    const [ sortAsc, setSortAsc ] = useState(true);

    const [ showLast, setShowLast ] = useState(true);
    const [ showFirst, setShowFirst ] = useState(false);
    const [ showExt, setShowExt ] = useState(false);
    const [ showTitle, setShowTitle ] = useState(false);
    const [ showEmail, setShowEmail ] = useState(false);
    const [ showDepartment, setShowDepartment ] = useState(false);
    const [ showManager, setShowManager ] = useState(false);
    const [ arrow, setArrow ] = useState(faArrowDown);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ filterLoc, setFilterLoc ] = useState('');
    const [ filterMode, setFilterMode ] = useState('none');
    const [ filterString, setFilterString ] = useState('A');

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    let db = data.default;
    switch (filterMode) {
        case 'none':
        default:
            break;
        case 'filterStart':
            db = db.filter((element) => element[filterLoc].substring(0, filterString.length).toUpperCase() === filterString.toUpperCase());
            break;
        case 'filterEnd':
            break;
        case 'filterContain':
            break;
        case 'filter!Contain':
            break;
        case 'filter=':
            break;
        case 'filter!=':
            break;
        case 'filterList':
            break;
    }

    console.log({'db': db});

    if ( sortAsc ) {
        db.sort((a, b) => (a[sortCol] > b[sortCol]) ? 1 : -1);
    } else {
        db.sort((a, b) => (a[sortCol] < b[sortCol]) ? 1 : -1);
    }

    const changeDirection = (currentCol) =>{
        if (currentCol === sortCol) {
            if ( sortAsc ) {
                setSortAsc(false);
                setArrow(faArrowUp);
            } else {
                setArrow(faArrowDown);
                setSortAsc(true);
            }
        } else {
            setSortAsc(true);
            setArrow(faArrowDown);
        }
    }

    const hideArrows = () => {
        setShowLast(false);
        setShowFirst(false);
        setShowExt(false);
        setShowTitle(false);
        setShowEmail(false);
        setShowDepartment(false);
        setShowManager(false);
    }

    const headClickHandler = (event, thId, setCol) => {
        event.preventDefault();
        changeDirection(thId);
        setSortCol(thId);
        hideArrows();
        setCol(true);
    }

    const filter = (event, thId) => {
        event.preventDefault();
        event.stopPropagation();
        setFilterLoc(thId);
        toggleModal();
    }

    const filterClickHandler = (targetId) => {
        toggleModal();
        console.log(filterLoc);
        console.log(targetId);

    }
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel='Filter'
            >
                <button onClick={toggleModal}>Close</button>
                <Filter
                    filterMode={ filterMode }
                    setFilterMode={ setFilterMode }
                    toggleModal = { toggleModal }
                    filterString = { filterString }
                    setFilterString = { setFilterString }
                />
                <button onClick={toggleModal}>Close</button>
            </Modal>
            <table>
                <thead>
                    <tr>
                        <th data-id='lastName' onClick={(event) => headClickHandler(event, 'lastName', setShowLast)}>
                            Last Name&nbsp;
                            <FontAwesomeIcon icon={ showLast ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon 
                                icon={ faFilter } 
                                onClick={(event) => filter(event, 'lastName')}
                            />
                        </th>
                        <th data-id='name' onClick={(event) => headClickHandler(event, 'name', setShowFirst)}>
                            Preferred First Name (Legal Name)&nbsp;
                            <FontAwesomeIcon icon={ showFirst ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon icon={ faFilter } onClick={(event) => filter(event, 'name')} />
                        </th>
                        <th data-id='ext' onClick={(event) => headClickHandler(event, 'ext', setShowExt)}>
                            Extension&nbsp;
                            <FontAwesomeIcon icon={ showExt ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon icon={ faFilter } onClick={(event) => filter(event, 'ext')} />
                        </th>
                        <th data-id='title' onClick={(event) => headClickHandler(event, 'title', setShowTitle)}>
                            Job Title&nbsp;
                            <FontAwesomeIcon icon={ showTitle ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon icon={ faFilter } onClick={(event) => filter(event, 'title')} />
                        </th>
                        <th data-id='email' onClick={(event) => headClickHandler(event, 'email', setShowEmail)}>
                            Email&nbsp;
                            <FontAwesomeIcon icon={ showEmail ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon icon={ faFilter } onClick={(event) => filter(event, 'email')} />
                        </th>
                        <th data-id='department' onClick={(event) => headClickHandler(event, 'department', setShowDepartment)}>
                            Department&nbsp;
                            <FontAwesomeIcon icon={ showDepartment ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon icon={ faFilter } onClick={(event) => filter(event, 'department')} />
                        </th>
                        <th data-id='manager' onClick={(event) => headClickHandler(event, 'manager', setShowManager)}>
                            Manager&nbsp;
                            <FontAwesomeIcon icon={ showManager ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon icon={ faFilter } onClick={(event) => filter(event, 'manager')} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {db.map(row => {
                        return(<TableRow key={ 'data-' + row.id } data={ row }/>);
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;