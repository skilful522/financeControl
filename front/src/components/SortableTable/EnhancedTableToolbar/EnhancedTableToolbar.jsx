import Toolbar from '@material-ui/core/Toolbar';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import React, { useMemo } from 'react';

import { useToolbarStyles } from './useStyles';

const EnhancedTableToolbar = ({ tableTitle, selected, onAdd, onDelete, onEdit }) => {
  const classes = useToolbarStyles();
  const numSelected = useMemo(() => selected.length, [selected]);

  return (
    <Toolbar
      className={cn(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} выбрано
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}

      {(onEdit && onDelete && numSelected > 0) ? (
        <>
          {numSelected === 1 && (
            <Tooltip title="Редактировать">
              <IconButton aria-label="edit">
                <EditIcon onClick={onEdit(selected)} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Удалить">
            <IconButton aria-label="delete">
              <DeleteIcon onClick={onDelete(selected)} />
            </IconButton>
          </Tooltip>
        </>
      ) : onAdd && (
        <Tooltip title="Добавить продукт">
          <IconButton aria-label="add product">
            <AddIcon onClick={onAdd} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
