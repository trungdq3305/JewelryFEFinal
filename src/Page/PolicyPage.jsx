import React from 'react'
import Header from '../Components/Header/Header'
import './Scss/PolicyPage.css'
import PolicySideBar from '../Components/Sidebar/PolicySlideBar'
import { Col, Container, Row } from 'react-bootstrap'
export default function PolicyPage() {
    return (
        <div className="policy-page-container">
            <Header />

            <div className="policy-container">
                Jewelry Store Policies and Warranty
            </div>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col md={1}>
                        <PolicySideBar />
                    </Col>
                    <Col md={11}>

                        <div className="policy-page">

                            <section id="promotions" className="policy-section">
                                <h2>1. Promotions and Discounts Policy</h2>
                                <h3>Promotional Programs:</h3>
                                <ul>
                                    <li>The store regularly organizes promotional programs to coincide with holidays, special occasions, and seasonal events.</li>
                                    <li>Promotions may include discounts, gift with purchase, buy-one-get-one offers, and limited-time sales.</li>
                                    <li>Information about current promotions will be prominently displayed in-store, on the company website, social media channels, and through customer email newsletters.</li>
                                    <li>Terms and conditions for each promotion will be clearly stated, including the duration, eligible products, and any restrictions.</li>
                                </ul>
                                <h3>Exclusive Customer Discounts:</h3>
                                <ul>
                                    <li>Loyal customers may receive special discounts and offers as a token of appreciation for their continued patronage.</li>
                                    <li>Exclusive discounts may include additional percentage off on certain items, early access to sales, and invitations to exclusive events.</li>
                                    <li>These special discounts are subject to managerial approval. Sales staff will need to verify customer eligibility and obtain confirmation from the store manager before applying the discount.</li>
                                    <li>Customers may be required to present a loyalty card or be part of the store’s loyalty program to qualify for these exclusive offers.</li>
                                </ul>
                            </section>

                            <section id="buyback" className="policy-section">
                                <h2>2. Buy-Back Policy</h2>
                                <h3>Buy-Back Process:</h3>
                                <ul>
                                    <li>Customers wishing to sell back their jewelry can do so by bringing the items to the store's designated buy-back counter.</li>
                                    <li>Upon arrival, customers will be greeted by a trained staff member who will guide them through the buy-back process.</li>
                                    <li>The product will undergo a thorough inspection by a qualified appraiser to assess its condition, authenticity, and weight.</li>
                                    <li>Based on the appraisal, the staff will provide the customer with a buy-back price offer.</li>
                                    <li>If the customer agrees to the offer, a buy-back receipt will be issued, and the payment will be processed promptly.</li>
                                </ul>
                                <h3>Buy-Back Pricing Policy:</h3>
                                <ul>
                                    <li><strong>Regular Jewelry and Semi-Precious Stones:</strong>
                                        <ul>
                                            <li>The store buys back only the gold content of the jewelry, excluding any semi-precious stones.</li>
                                            <li>The buy-back price for gold is determined by the current market rate at the time of the transaction, which is displayed daily in-store.</li>
                                            <li>The store maintains a transparent pricing policy, ensuring customers receive fair market value.</li>
                                        </ul>
                                    </li>
                                    <li><strong>Precious Stones:</strong>
                                        <ul>
                                            <li>For jewelry containing precious stones, the store will buy back these items at a rate predetermined in the system.</li>
                                            <li>Typically, the buy-back price is set at 70% of the original purchase price, reflecting depreciation and market conditions.</li>
                                            <li>The exact rate and terms will be clearly communicated to the customer during the appraisal process.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </section>

                            <section id="receipts" className="policy-section">
                                <h2>3. Assistance in Retrieving Purchase Receipts</h2>
                                <h3>Receipt Retrieval Process:</h3>
                                <ul>
                                    <li>Customers who have lost their purchase receipts can request a copy by visiting the store’s customer service counter.</li>
                                    <li>To retrieve a receipt, customers should provide as much information as possible, such as the purchase date, the name under which the purchase was made, and any other relevant details.</li>
                                    <li>The staff will search the store's sales records and database to locate the transaction.</li>
                                    <li>Once the receipt is found, a duplicate copy will be printed and provided to the customer.</li>
                                    <li>This service ensures customers can take advantage of warranties, returns, or any other needs that require proof of purchase.</li>
                                </ul>
                            </section>

                            <section id="warranty" className="policy-section">
                                <h2>4. Warranty Policy</h2>
                                <h3>Warranty Period:</h3>
                                <ul>
                                    <li>All jewelry products come with a warranty period clearly stated on the accompanying warranty card.</li>
                                    <li>The warranty period typically ranges from 6 months to 2 years, depending on the type of product and its value.</li>
                                    <li>High-value items may have extended warranty periods as part of the store’s commitment to quality and customer satisfaction.</li>
                                </ul>
                                <h3>Warranty Conditions:</h3>
                                <ul>
                                    <li>The warranty covers any manufacturing defects or faults in the material or workmanship.</li>
                                    <li>It does not cover damage resulting from misuse, accidental damage, improper care, or exposure to harsh chemicals.</li>
                                    <li>Customers must present the warranty card and original purchase receipt when requesting warranty service.</li>
                                    <li>The warranty may include free repairs, replacements, or refunds as deemed appropriate by the store.</li>
                                </ul>
                                <h3>Warranty Process:</h3>
                                <ul>
                                    <li>Customers experiencing issues with their jewelry should bring the item to the store’s service counter.</li>
                                    <li>The item will be inspected by a specialist to diagnose the problem and verify if it falls under the warranty coverage.</li>
                                    <li>If the issue is covered, the store will either repair the item on-site, send it to a specialist repair service, or provide a replacement.</li>
                                    <li>In cases where the item cannot be repaired or replaced, the store may offer a refund or store credit.</li>
                                </ul>
                            </section>

                            <section id="support" className="policy-section">
                                <h2>5. Customer Support Services</h2>
                                <h3>Consultation Service:</h3>
                                <ul>
                                    <li>The store offers free consultation services for customers seeking advice on jewelry selection, care, and maintenance.</li>
                                    <li>Experienced staff and gemologists are available to answer questions, provide recommendations, and help customers make informed decisions.</li>
                                    <li>Customers can schedule consultations in advance via phone, email, or in-store appointments.</li>
                                </ul>
                                <h3>Cleaning and Maintenance Service:</h3>
                                <ul>
                                    <li>The store provides professional cleaning and maintenance services to keep jewelry looking its best.</li>
                                    <li>Regular cleaning services may be offered free of charge, while more extensive maintenance, such as polishing or stone resetting, may incur a fee.</li>
                                    <li>Customers can bring their jewelry to the store at any time for an inspection and maintenance recommendation.</li>
                                </ul>
                            </section>

                            <section id="services" className="policy-section">
                                <h2>6. Additional Services</h2>
                                <h3>Custom Design and Modification:</h3>
                                <ul>
                                    <li>The store offers custom design services for customers looking to create unique pieces of jewelry.</li>
                                    <li>Skilled designers work closely with customers to bring their vision to life, from initial sketches to the final product.</li>
                                    <li>Modification services are also available for existing pieces, including resizing, engraving, and stone replacement.</li>
                                </ul>
                                <h3>Appraisal Services:</h3>
                                <ul>
                                    <li>The store provides professional appraisal services for insurance, resale, or personal purposes.</li>
                                    <li>Certified appraisers evaluate the jewelry and provide detailed reports on the item's value, authenticity, and condition.</li>
                                </ul>
                            </section>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}