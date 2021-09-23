import React , { Suspense } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Main from './Main/Main';
import styles from './Client.module.scss';

function Client() {
  return (
    <div className={styles.container}>
       <Suspense fallback="loading">
      <Header />
      </Suspense>
      <Main />
      <Footer />
    </div>
  );
}

export default Client;
