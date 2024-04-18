import React from 'react';
import { Link } from 'react-router-dom';
import authorDefault from '../../assets/user.png'; // Ensure this path is correct
import './AuthorCard.css'; // Make sure CSS path is correct

const AuthorCard = ({ author, works }) => {
    const photoUrl = author.photos?.length > 0 ? `https://covers.openlibrary.org/b/id/${author.photos[0]}-M.jpg` : authorDefault;
    const getBioText = (bio) => bio && typeof bio === 'object' && bio.value ? bio.value : bio || 'Bio not available';

    return (
        <div className="author-card-container">
            <div className="author-details">
                <h2>{author.name}</h2>
                <p className="author-label">Bio: <span className="author-bio">{getBioText(author.bio)}</span></p>
                {author.birth_date && <p className="author-label">Birth Date: <span>{author.birth_date}</span></p>}
                {author.death_date && <p className="author-label">Death Date: <span>{author.death_date}</span></p>}
                {author.alternate_names && <p className="author-label">Alternate Names: <span>{author.alternate_names.join(", ")}</span></p>}
                <hr />
                {works && works.length > 0 && (
                    <div className="author-works">
                        <h3 className="author-label">Published Works:</h3>
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
            <img src={photoUrl} alt={`Portrait of ${author.name}`} className="author-image"/>
        </div>
    );
};

export default AuthorCard;