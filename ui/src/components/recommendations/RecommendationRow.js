import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
//import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IntegrationAutosuggest from '../autoSuggestions/AutosuggestFields';

import { useStyles } from './styles';

export default function RecommendationRow({ id, details, key, columnType }) {
    const [isSelected, setIsSelected] = useState(details.isSelected);
    const [type, setType] = useState(details.type);
    const [subtype, setSubtype] = useState(details.subtype);
    const classes = useStyles(); 

    details.isSelected = isSelected;
    details.type = type;
    details.subtype = subtype;

    return (<TableRow
        hover
        onClick={event => { setIsSelected(!isSelected); }}
        role="checkbox"
        aria-checked={isSelected}
        tabIndex={-1}
        key={key}
        selected={isSelected}
    >
        <TableCell scope="row">
            <Table>
                <TableBody>
                    {details.isManualInput || !details.support ?
                        <TableRow key={key + "_supportRow0"}><strong>Other</strong></TableRow> :
                        details.support.map((sup, idx) => <TableRow key={key + '_supportRow' + idx.toString()}>{sup}</TableRow>)
                    }
                </TableBody>
            </Table>
        </TableCell>
        <TableCell align="center">
            {details.isManualInput ? <IntegrationAutosuggest
                labelId={`typeMain`}
                typeId={columnType}
                textField={type}
                setTextField={setType}
            /> : type}
        </TableCell>
        <TableCell align="center">
            {details.isManualInput ? <IntegrationAutosuggest
                labelId={`typeSub`}
                typeId={columnType}
                textField={subtype}
                setTextField={setSubtype}
            /> : subtype}
        </TableCell>
        <TableCell align="center" padding="checkbox">
            <Checkbox
                checked={isSelected}
                inputProps={{ 'aria-labelledby': `table-checkbox-${id}` }} />
        </TableCell>
    </TableRow>)
}