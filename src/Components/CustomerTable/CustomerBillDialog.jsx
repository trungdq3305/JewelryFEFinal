import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const CustomerBillDialog = ({ open, onClose, bills }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Bills</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {bills !== undefined ? (
            <List>
              {bills.map((bill) => (
                <ListItem key={bill.billId}>
                  <ListItemText
                    primary={`Bill ID: ${bill.billId}`}
                    secondary={`Total Cost: ${
                      bill.totalCost
                    } | Publish Day: ${formatDate(bill.publishDay)}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <p>No bills available for this customer.</p>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomerBillDialog
