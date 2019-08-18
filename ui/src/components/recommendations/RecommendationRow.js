import React, { useState } from 'react';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { randomBytes } from 'crypto';

import { useStyles } from './styles';

export default function RecommendationRow({ id, details, key }) {
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
            {details.isManualInput ? <TextField
                id="outlined-dense"
                label={`Enter type`}
                className={clsx(classes.textField, classes.dense)}
                defaultValue={type}
                margin="dense"
                variant="outlined"
                onClick={event => event.stopPropagation()}
                onChange={event => setType(event.target.value)}
            /> : type}
        </TableCell>
        <TableCell align="center">
            {details.isManualInput ? <TextField
                id="outlined-dense"
                label={`Enter subtype`}
                className={clsx(classes.textField, classes.dense)}
                defaultValue={subtype}
                margin="dense"
                variant="outlined"
                onClick={event => event.stopPropagation()}
                onChange={event => setSubtype(event.target.value)}
            /> : subtype}
        </TableCell>
        <TableCell align="center" padding="checkbox">
            <Checkbox
                checked={isSelected}
                inputProps={{ 'aria-labelledby': `table-checkbox-${id}` }} />
        </TableCell>
    </TableRow>)
}