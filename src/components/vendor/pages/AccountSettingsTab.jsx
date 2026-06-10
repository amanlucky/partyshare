import React from "react";
import css from "../../../containers/VendorDashboardPage/VendorDashboardPage.module.css";

const AccountSettingsTab = ({ currentUser }) => {
  return (
    <div>
                <div>
            {/* USER HEADER */}

            <section className={css.section}>

              <div className={css.userHeaderCard}>

                <div className={css.userAvatar}>
                  {currentUser?.attributes?.profile?.displayName?.charAt(0) || 'U'}
                </div>

                <div>

                  <h2>
                    {currentUser?.attributes?.profile?.displayName}
                  </h2>

                  <p>
                    {currentUser?.attributes?.email}
                  </p>

                </div>

              </div>

            </section>
            {/* BUSINESS PROFILE */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Business Profile</h2>
              </div>

              <div className={css.settingsCard}>

                <div className={css.formGrid}>

                  <div className={css.formGroup}>
                    <label>Business Name</label>

                    <input
                      type="text"
                      defaultValue={
                        currentUser?.attributes?.profile?.displayName || ''
                      }
                      className={css.formInput}
                    />
                  </div>

                  <div className={css.formGroup}>
                    <label>Phone Number</label>

                    <input
                      type="text"
                      defaultValue="+1 202 555 0182"
                      className={css.formInput}
                    />
                  </div>

                  <div className={css.formGroup}>
                    <label>Email Address</label>

                    <input
                      type="email"
                      defaultValue={
                        currentUser?.attributes?.email || ''
                      }
                      className={css.formInput}
                    />
                  </div>

                  <div className={css.formGroup}>
                    <label>Website</label>

                    <input
                      type="text"
                      defaultValue="www.partyshare.com"
                      className={css.formInput}
                    />
                  </div>

                </div>

                <div className={css.formGroup}>
                  <label>Business Description</label>

                  <textarea
                    rows="5"
                    className={css.formTextarea}
                    defaultValue="Premium event rentals for weddings, birthdays, and corporate events."
                  />
                </div>

              </div>

            </section>

            {/* PAYOUT SETTINGS */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Payout Settings</h2>
              </div>

              <div className={css.settingsCard}>

                <div className={css.formGrid}>

                  <div className={css.formGroup}>
                    <label>Bank Name</label>

                    <input
                      type="text"
                      defaultValue="Chase Bank"
                      className={css.formInput}
                    />
                  </div>

                  <div className={css.formGroup}>
                    <label>Account Holder</label>

                    <input
                      type="text"
                      defaultValue="PartyShare LLC"
                      className={css.formInput}
                    />
                  </div>

                  <div className={css.formGroup}>
                    <label>Payout Schedule</label>

                    <select className={css.formInput}>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div className={css.formGroup}>
                    <label>Currency</label>

                    <select className={css.formInput}>
                      <option>USD</option>
                      <option>CAD</option>
                    </select>
                  </div>

                </div>

              </div>

            </section>

            {/* NOTIFICATIONS */}

            <section className={css.section}>

              <div className={css.sectionHeader}>
                <h2>Notifications</h2>
              </div>

              <div className={css.settingsCard}>

                <div className={css.notificationRow}>
                  <div>
                    <h3>Email Notifications</h3>
                    <p>Receive booking updates via email</p>
                  </div>

                  <input type="checkbox" defaultChecked />
                </div>

                <div className={css.notificationRow}>
                  <div>
                    <h3>SMS Notifications</h3>
                    <p>Receive booking alerts by SMS</p>
                  </div>

                  <input type="checkbox" />
                </div>

                <div className={css.notificationRow}>
                  <div>
                    <h3>Marketing Emails</h3>
                    <p>Receive platform updates and promotions</p>
                  </div>

                  <input type="checkbox" defaultChecked />
                </div>

              </div>

            </section>

            {/* SAVE BUTTON */}

            <div className={css.saveSection}>
              <button className={css.saveBtn}>
                Save Changes
              </button>
            </div>

          </div>
    </div>
  );
};

export default AccountSettingsTab;