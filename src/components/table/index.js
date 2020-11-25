import React, { useState } from 'react';
import './style.css';
import TableRow from '../tableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';

function Table(db){
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

    if ( sortAsc ) {
        db.default.sort((a, b) => (a[sortCol] > b[sortCol]) ? 1 : -1);
    } else {
        db.default.sort((a, b) => (a[sortCol] < b[sortCol]) ? 1 : -1);
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

    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => { 
                            changeDirection('lastName');
                            setSortCol('lastName');
                            hideArrows();
                            setShowLast(true);
                            }
                        }>Last Name&nbsp;
                            <FontAwesomeIcon icon={showLast ? arrow : faArrowsAltV} />
                    </th>
                    <th onClick={() => { 
                            changeDirection('name');
                            setSortCol('name');
                            hideArrows();
                            setShowFirst(true);
                            }
                        }>Preferred First Name (Legal Name)&nbsp;
                            <FontAwesomeIcon icon={showFirst ? arrow : faArrowsAltV} />
                    </th>
                    <th onClick={() => { 
                            changeDirection('ext');
                            setSortCol('ext');
                            hideArrows();
                            setShowExt(true);
                            }
                        }>Extension&nbsp;
                            <FontAwesomeIcon icon={showExt ? arrow : faArrowsAltV} />
                    </th>
                    <th onClick={() => { 
                            changeDirection('title');
                            setSortCol('title');
                            hideArrows();
                            setShowTitle(true);
                            }
                        }>Job Title&nbsp;
                            <FontAwesomeIcon icon={showTitle ? arrow : faArrowsAltV} />
                    </th>
                    <th onClick={() => { 
                            changeDirection('email');
                            setSortCol('email');
                            hideArrows();
                            setShowEmail(true);
                            }
                        }>Email&nbsp;
                            <FontAwesomeIcon icon={showEmail ? arrow : faArrowsAltV} />
                    </th>
                    <th onClick={() => { 
                            changeDirection('department');
                            setSortCol('department');
                            hideArrows();
                            setShowDepartment(true);
                            }
                        }>Department&nbsp;
                            <FontAwesomeIcon icon={showDepartment ? arrow : faArrowsAltV} />
                    </th>
                    <th onClick={() => { 
                            changeDirection('manager');
                            setSortCol('manager');
                            hideArrows();
                            setShowManager(true);
                            }
                        }>Manager&nbsp;
                            <FontAwesomeIcon icon={showManager ? arrow : faArrowsAltV} />
                    </th>
                </tr>
            </thead>
            <tbody>
                {db.default.map(row => {
                    return(<TableRow key={ 'data-' + row.id } data={ row }/>);
                })}
            </tbody>
        </table>
    );
}

export default Table;