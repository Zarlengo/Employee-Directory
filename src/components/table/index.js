import React, { useState } from 'react';
import Modal from 'react-modal';
import './style.css';
import TableRow from '../tableRow';
import Filter from '../filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowsAltV, faFilter, faWindowClose } from '@fortawesome/free-solid-svg-icons';

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
    const [ filterString, setFilterString ] = useState('');
    const [ modalLeft, setModalLeft ] = useState(0);
    const [ modalTop, setModalTop ] = useState(0);

    const customStyles = {
        content : {
          top                   : modalTop,
          left                  : modalLeft,
          right                 : 'auto',
          bottom                : 'auto',
        }
    };

    let w = window.innerWidth;
    if ( modalLeft + 300 > w) {
        setModalLeft(w - 300);
    }

    const toggleModal = (event) => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setModalLeft(event.clientX);
            setModalTop(event.clientY);
        }
    }

    const resetModal = () => {
        setFilterString('');
        setFilterMode('none');
        setFilterLoc('');
        toggleModal();
    } 

    console.log({'filterLoc': filterLoc});
    let db = data.default;
    switch (filterMode) {
        case 'none':
        default:
            break;
        case 'filterStart':
            db = db.filter((element) => element[filterLoc] === null ? false : element[filterLoc].toString().substring(0, filterString.length).toUpperCase() === filterString.toUpperCase());
            break;
        case 'filterEnd':
            db = db.filter((element) => element[filterLoc] === null ? false : element[filterLoc].toString().substring(element[filterLoc].toString().length - filterString.length).toUpperCase() === filterString.toUpperCase());
            break;
        case 'filterContain':
            db = db.filter((element) => element[filterLoc].toString().toUpperCase().includes(filterString.toUpperCase()));
            break;
        case 'filter!Contain':
            db = db.filter((element) => !element[filterLoc].toString().toUpperCase().includes(filterString.toUpperCase()));
            break;
        case 'filter=':
            db = db.filter((element) => element[filterLoc].toString().toUpperCase() === filterString.toUpperCase());
            break;
        case 'filter!=':
            db = db.filter((element) => element[filterLoc].toString().toUpperCase() !== filterString.toUpperCase());
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
        toggleModal(event);
    }

    return (
        <div>
            <Modal
                style={customStyles}
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel='Filter'
            >
                <FontAwesomeIcon icon={ faWindowClose } onClick={toggleModal} />
                <Filter
                    filterMode={ filterMode }
                    setFilterMode={ setFilterMode }
                    toggleModal = { toggleModal }
                    filterString = { filterString }
                    setFilterString = { setFilterString }
                />
                <button onClick={resetModal}>Reset</button>
            </Modal>
            <table>
                <thead>
                    <tr>
                        <th data-id='lastName' onClick={(event) => headClickHandler(event, 'lastName', setShowLast)}>
                            Last Name&nbsp;
                            <FontAwesomeIcon icon={ showLast ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon
                                style={filterLoc === 'lastName' ? {color:'limegreen'} : {}}
                                icon={ faFilter } 
                                onClick={(event) => filter(event, 'lastName')}
                            />
                        </th>
                        <th data-id='name' onClick={(event) => headClickHandler(event, 'name', setShowFirst)}>
                            Preferred First Name (Legal Name)&nbsp;
                            <FontAwesomeIcon icon={ showFirst ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon
                                style={filterLoc === 'name' ? {color:'limegreen'} : {}}
                                icon={ faFilter }
                                onClick={(event) => filter(event, 'name')}
                            />
                        </th>
                        <th data-id='ext' onClick={(event) => headClickHandler(event, 'ext', setShowExt)}>
                            Extension&nbsp;
                            <FontAwesomeIcon icon={ showExt ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon
                                style={filterLoc === 'ext' ? {color:'limegreen'} : {}}
                                icon={ faFilter }
                                onClick={(event) => filter(event, 'ext')}
                            />
                        </th>
                        <th data-id='title' onClick={(event) => headClickHandler(event, 'title', setShowTitle)}>
                            Job Title&nbsp;
                            <FontAwesomeIcon icon={ showTitle ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon
                                style={filterLoc === 'title' ? {color:'limegreen'} : {}}
                                icon={ faFilter }
                                onClick={(event) => filter(event, 'title')}
                            />
                        </th>
                        <th data-id='email' onClick={(event) => headClickHandler(event, 'email', setShowEmail)}>
                            Email&nbsp;
                            <FontAwesomeIcon icon={ showEmail ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon
                                style={filterLoc === 'email' ? {color:'limegreen'} : {}}
                                icon={ faFilter }
                                onClick={(event) => filter(event, 'email')}
                            />
                        </th>
                        <th data-id='department' onClick={(event) => headClickHandler(event, 'department', setShowDepartment)}>
                            Department&nbsp;
                            <FontAwesomeIcon icon={ showDepartment ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon
                                style={filterLoc === 'department' ? {color:'limegreen'} : {}}
                                icon={ faFilter }
                                onClick={(event) => filter(event, 'department')}
                            />
                        </th>
                        <th data-id='manager' onClick={(event) => headClickHandler(event, 'manager', setShowManager)}>
                            Manager&nbsp;
                            <FontAwesomeIcon icon={ showManager ? arrow : faArrowsAltV } />&nbsp;
                            <FontAwesomeIcon
                                style={filterLoc === 'manager' ? {color:'limegreen'} : {}}
                                icon={ faFilter }
                                onClick={(event) => filter(event, 'manager')}
                            />
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