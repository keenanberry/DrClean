import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import { randomBytes } from 'crypto';

import RecommendationRow from './RecommendationRow';

export default function RecommendationTableBody({
  rows,
  rowKeyPrefix
}) {
  return (
    <TableBody>
      {rows.map((props, idx) => (<RecommendationRow {...props} key={rowKeyPrefix + idx.toString()}/>))}
    </TableBody>
  );
}