import React from 'react';
import css from './AuthLayout.module.css';

const AuthLayout = ({ children, image }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <div className={css.formSection}>
          {children}
        </div>

        <div className={css.imageSection}>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;