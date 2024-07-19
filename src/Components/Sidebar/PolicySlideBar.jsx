import React from 'react';
import '../../Page/Scss/PolicyPage.css';

export default function PolicySideBar() {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="#promotions">Promotions and Discounts Policy</a></li>
        <li><a href="#buyback">Buy-Back Policy</a></li>
        <li><a href="#receipts">Assistance in Retrieving Purchase Receipts</a></li>
        <li><a href="#warranty">Warranty Policy</a></li>
        <li><a href="#support">Customer Support Services</a></li>
        <li><a href="#services">Additional Services</a></li>
      </ul>
    </div>
  );
}