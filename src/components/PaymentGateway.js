import React, { memo } from 'react'
import PropTypes from 'prop-types'

const PaymentGateway = memo(function PaymentGateway(props) {
  return (
    <div>
    <form>
        <label htmlFor="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" name="cardNumber" required />

        <label htmlFor="expiryDate">Expiry Date:</label>
        <input type="text" id="expiryDate" name="expiryDate" required />

        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" required />

        <label htmlFor="cardHolderName">Card Holder Name:</label>
        <input type="text" id="cardHolderName" name="cardHolderName" required />

        <button type="submit">Pay Now</button>
    </form>
    </div>
  )
})

PaymentGateway.propTypes = {

}

export default PaymentGateway
