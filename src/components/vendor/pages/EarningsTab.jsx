import React from "react";
import css from "../../../containers/VendorDashboardPage/VendorDashboardPage.module.css";

const EarningsTab = ({
  grossRevenue,
  netPayouts,
  pendingPayouts,
  bookings,
}) => {
  return (
    <>
                <div>

            {/* TOP CARDS */}

            <section className={css.summaryGrid}>

              <div className={css.summaryCard}>
                <h3>${grossRevenue / 100}</h3>
                <p>Gross Booking Revenue</p>
              </div>

              <div className={css.summaryCard}>
                <h3>${netPayouts / 100}</h3>
                <p>Net Payouts</p>
              </div>

              <div className={css.summaryCard}>
                  <h3>
                    ${pendingPayouts / 100}
                  </h3>
                  <p>Upcoming Payout</p>
                </div>
              <div className={css.summaryCard}>
                <h3>${pendingPayouts / 100}</h3>
                <p>Pending Payouts</p>
              </div>

            </section>

            {/* EARNINGS CHART PLACEHOLDER */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Earnings Overview</h2>
              </div>

              <div className={css.chartPlaceholder}>
                Earnings Chart Coming Soon
              </div>

            </section>

            {/* PAYOUT METHOD */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Payout Method</h2>
              </div>

              <div className={css.payoutCard}>

                <div>
                  <h3>Stripe Connected</h3>
                  <p>Your payouts are connected and verified.</p>
                </div>

                <button className={css.approveBtn}>
                  Manage Stripe
                </button>

              </div>

            </section>

            {/* TRANSACTIONS TABLE */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Recent Transactions</h2>
              </div>

              <div className={css.tableWrapper}>

                <table className={css.table}>

                  <thead>
                    <tr>
                      <th>Payout ID</th>
                      <th>Date</th>
                      <th>Renter</th>
                      <th>Amount</th>
                      <th>Fees</th>
                      <th>Net</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {bookings.map(transaction => (
                      <tr key={transaction.id}>

                        <td>{transaction.id.uuid}</td>

                        <td>
                        {
                          new Date(
                            transaction.attributes.createdAt
                          ).toLocaleDateString()
                        }
                      </td>

                      <td>
                        {
                          transaction.customer?.attributes
                            ?.profile?.displayName
                            || 'Customer'
                        }
                      </td>

                      <td>
                        {
                          transaction.attributes?.payinTotal
                            ? `$${transaction.attributes.payinTotal.amount / 100}`
                            : '-'
                        }
                      </td>

                      <td>
                        {
                          transaction.attributes?.commission
                            ? `$${transaction.attributes.commission.amount / 100}`
                            : '$0'
                        }
                      </td>

                      <td>
                        {
                          transaction.attributes?.payoutTotal
                            ? `$${transaction.attributes.payoutTotal.amount / 100}`
                            : '-'
                        }
                      </td>

                      <td>
                      <span className={css.activeStatus}>
                        {
                          transaction.attributes
                            ?.lastTransition
                        }
                      </span>
                    </td>
                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          </div>
    </>
  );
};

export default EarningsTab;