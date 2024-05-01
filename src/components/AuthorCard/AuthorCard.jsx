import React from 'react';
import { Link } from 'react-router-dom';
import authorDefault from '../../assets/user.png';
import styles from './AuthorCard.module.css'

const AuthorCard = ({ author, works }) => {
    const photoUrl = author.photos?.length > 0 ? `https://covers.openlibrary.org/b/id/${author.photos[0]}-M.jpg` : authorDefault;
    const getBioText = (bio) => bio && typeof bio === 'object' && bio.value ? bio.value : bio || 'Bio not available';

    return (
        <div className={styles.authorCardContainer}>
            <div className={styles.authorDetails}>
                <h2>{author.name}</h2>
                <p className={styles.authorLabel}>Bio: <span className={styles.authorBio}>{getBioText(author.bio)}</span></p>
                {author.birth_dae && <p className={styles.authorLabel}>Birth Date: <span>{author.birth_date}</span></p>}
                {author.death_date && <p className={styles.authorLabel}>Death Date: <span>{author.death_date}</span></p>}
                {author.alternate_names && <p className={styles.authorLabel}>Alternate Names: <span>{author.alternate_names.join(", ")}</span></p>}
                <hr />
                {works && works.length > 0 && (
                    <div className={styles.authorWorks}>
                        <h3 className={styles.authorLabel}>Published Works:</h3>
                        <ul>
                            {works.map((work, index) => (
                                <li key={index}>
                                    <Link to={`/bookDetails/${work.key.replace('/works/', '')}`}>{work.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <img src={photoUrl} alt={`Portrait of ${author.name}`} className={styles.authorImage}/>
        </div>
    );
};

export default AuthorCard;