import React from 'react';

const AuthorCard = ({ author, works }) => {
    console.log("Author Prop:", author); // Log the value of the author prop
    console.log("Works data:", works); // Log the value of the works prop

    // Default photo URL
    let photoUrl = '/default_author_photo.jpg';

    // Check if author object exists and has a photos array with at least one photo ID
    if (author && author.photos && author.photos.length > 0) {
        // Generate the photo URL using the first photo ID in the array
        photoUrl = `https://covers.openlibrary.org/b/id/${author.photos[0]}-M.jpg`;
    }

    console.log("Photo URL:", photoUrl); // Log the generated photo URL

    return (
        <div>
            <h2>{author.name}</h2>
            {author.title && <p>Title: {author.title}</p>}
            {author.links && (
                <div>
                    <h3>Links:</h3>
                    <ul>
                        {author.links.map((link, index) => (
                            <li key={index}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {author.bio && <p>Bio: {author.bio}</p>}
            <img src={photoUrl} alt={`Portrait of ${author.name}`} style={{ width: "100px", height: "150px" }}/>
            {author.birth_date && <p>Birth Date: {author.birth_date}</p>}
            {author.death_date && <p>Death Date: {author.death_date}</p>}
            {author.entity_type && <p>Entity Type: {author.entity_type}</p>}
            {author.alternate_names && <p>Alternate Names: {author.alternate_names.join(", ")}</p>}
            {author.top_subjects && (
                <div>
                    <h3>Top Subjects:</h3>
                    <ul>
                        {author.top_subjects.map((subject, index) => (
                            <li key={index}>{subject}</li>
                        ))}
                    </ul>
                </div>
            )}
            {works && works.length > 0 && (
                <>
                    <h3>Published Works:</h3>
                    <ul>
                        {works.slice(0, 25).map((work, index) => (
                            <li key={index}>{work.title}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default AuthorCard;