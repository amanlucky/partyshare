import React from "react";
import css from "../../../containers/VendorDashboardPage/VendorDashboardPage.module.css";

const ReviewsTab = ({ reviews }) => {
  return (
    <div>
      <section className={css.summaryGrid}>
        <div className={css.summaryCard}>
          <h3>4.9</h3>
          <p>Average Rating</p>
        </div>

        <div className={css.summaryCard}>
          <h3>128</h3>
          <p>Total Reviews</p>
        </div>

        <div className={css.summaryCard}>
          <h3>96%</h3>
          <p>Positive Reviews</p>
        </div>
      </section>

      <section className={css.section}>
        <div className={css.sectionHeader}>
          <h2>Recent Reviews</h2>
        </div>

        <div className={css.reviewGrid}>
          {reviews.map(review => (
            <div key={review.id} className={css.reviewCard}>
              <div className={css.reviewHeader}>
                <div>
                  <h3>{review.reviewer}</h3>
                  <p>{review.item}</p>
                </div>

                <div className={css.rating}>
                  {"⭐".repeat(review.rating)}
                </div>
              </div>

              <p className={css.reviewText}>
                {review.review}
              </p>

              <div className={css.reviewFooter}>
                <span>{review.date}</span>

                <div className={css.reviewButtons}>
                  <button className={css.smallBtn}>
                    View
                  </button>

                  <button className={css.smallBtn}>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReviewsTab;