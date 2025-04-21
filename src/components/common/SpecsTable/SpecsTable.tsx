'use client';

import { PhoneSpecsPage } from '@/types/phone';
import styles from './SpecsTable.module.scss';
import { formatSpecName } from '@/helpers/helpers';

export default function SpecsTable({ specs }: { specs: PhoneSpecsPage }) {
  return (
    <div className={styles.specsTableContainer}>
      <dl className={styles.specsList}>
        {specs && Object.entries(specs).map(([key, value]) => (
          <div key={key} className={styles.specsRow}>
            <dt className={styles.specName}>{formatSpecName(key)}</dt>
            <dd className={styles.specValue}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}