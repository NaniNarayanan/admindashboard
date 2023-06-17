import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import React from 'react'

export default function ConfirmDialog(props) {

    const {ConfirmDialog, setConfirmDialog} = props;

  return (
    <Dialog open={ConfirmDialog.isOpen}>
        <DialogTitle>

        </DialogTitle>
        <DialogContent>
            <Typography variant='h6'>{ConfirmDialog.title}</Typography>
            <Typography variant='subtitle2'>{ConfirmDialog.subTitle}</Typography>
        </DialogContent>
        <DialogActions>
            <Button type='No' color='default'>No</Button>
            <Button type='Yes' color='secondary'>Yes</Button>
        </DialogActions>
    </Dialog>
  )
}
