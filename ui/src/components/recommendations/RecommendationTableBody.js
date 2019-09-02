import React from 'react';
import TableBody from '@material-ui/core/TableBody';

import RecommendationRow from './RecommendationRow';

export default function RecommendationTableBody({
  rows,
  rowKeyPrefix,
  columnType
}) {
  return (
    <TableBody>
      {rows.map((props, idx) => (<RecommendationRow {...props} key={rowKeyPrefix + idx.toString()} columnType={columnType} />))}
    </TableBody>
  );
}