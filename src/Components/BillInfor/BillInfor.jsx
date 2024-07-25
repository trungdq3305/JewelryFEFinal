import React from 'react'
import styles from '../BillInfor/BillInfor.module.scss'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import DiscountIcon from '@mui/icons-material/Discount'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Box } from '@mui/material'

const BillInfor = ({
  handleOpen,
  customer,
  vouchers,
  handleChange,
  handlePaymentType,
  totalCost,
  createBill,
}) => {
  return totalCost <= 0 ? (
    <></>
  ) : (
    <div className={styles.container}>
      <div className={styles.Customer}>
        <div className={styles.Title}>
          <PersonAddAltIcon sx={{ fontSize: 30 }} />
          <button onClick={handleOpen}>
            <h2>Customer</h2>
          </button>
        </div>
        <div className={styles.content}>
          {customer !== undefined ? (
            <>
              <p>Name: {customer.fullName}</p>
              <p>Phone: {customer.phone}</p>
              <p>Point: {customer.point}</p>
            </>
          ) : (
            <p>No customer</p>
          )}
        </div>
      </div>
      <div className={styles.Voucher}>
        <div className={styles.Title}>
          <DiscountIcon sx={{ fontSize: 25 }} />

          <h2>Voucher</h2>
        </div>
        <div className={styles.content}>
          <FormControl variant="filled" sx={{ m: 1, width: 200 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Voucher
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              onChange={handleChange}
              value={vouchers.voucherId}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              {vouchers !== undefined ? (
                vouchers.map((item) => (
                  <MenuItem key={item.voucherId} value={item.voucherId}>
                    {item.voucherId} - {Number(item.cost).toLocaleString('vn')}
                  </MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* <div className={styles.Payment}>
        <div className={styles.Title}>
          <PointOfSaleIcon sx={{ fontSize: 25 }} />

          <h2>Payment</h2>
        </div>
        <div className={styles.content}>
          <div>
            <button>
              <p>Pay by cash</p>
            </button>
          </div>
          <div>
            <button>
              <p>Pay by card</p>{' '}
            </button>
          </div>
        </div>
      </div> */}

      <>
        <div
          className={styles.Title}
          style={{ marginLeft: 30, marginBottom: 20 }}
        >
          <PointOfSaleIcon sx={{ fontSize: 25 }} />

          <h2>Payment</h2>
        </div>
        <div
          style={{
            marginLeft: 30,
            marginBottom: 20,
          }}
        >
          <Box
            sx={{
              width: 200,
            }}
          >
            <FormControl fullWidth variant="filled">
              <InputLabel id="demo-simple-select-label">Payment</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Payment"
                onChange={handlePaymentType}
                defaultValue={1}
              >
                <MenuItem value={1}>Pay By Cash</MenuItem>
                <MenuItem value={2}>Pay By Card</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <Button
          onClick={createBill}
          variant="contained"
          sx={{
            background: 'black',
            color: '#ffdbf0',
            marginLeft: '90px ',
            marginTop: '10px',
            '&:hover': {
              backgroundColor: '#ffdbf0',
              color: 'black',
            },
          }}
        >
          Continue
        </Button>
        {/* <Button
            onClick={handlePayByCard}
            variant="contained"
            sx={{
              background: 'black',
              color: '#ffdbf0',
              marginLeft: '90px ',
              marginTop: '10px',
              '&:hover': {
                backgroundColor: '#ffdbf0',
                color: 'black',
              },
            }}
          >
            Pay by card
          </Button> */}
      </>
    </div>
  )
}

export default BillInfor
