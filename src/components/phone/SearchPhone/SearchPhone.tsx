'use client';

import styles from './SearchPhone.module.scss';
import { usePhones } from '@/context/PhoneContext';

export default function SearchPhone () {
    const { setSearchTerm, filteredCount } = usePhones();
    
    return(
        <div className={styles.searchPhone}>
            <input 
                type="text" 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search for a smartphone...'
            />
            <p className={styles.resultsCount}>{filteredCount} Results</p>
        </div>
    );
}